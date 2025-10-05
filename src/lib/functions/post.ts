import { PrismaClient } from "../generated";

import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import path from "path";
import fs from "fs-extra";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const storage = new Storage({
    keyFilename: path.join(process.cwd(), "gcp-key.json"),
});

const bucketName = "bucket_astro_eye";
const bucket = storage.bucket(bucketName);

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function uploadImage(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId =  Number(formData.get("categoryId"));

    const fileName = file.name.split('.')[0];

    const bufferData = Buffer.from(await file.arrayBuffer());

    await bucket.file(`images/fileName/full.jpg`).save(bufferData, {
        resumable: false,
        contentType: 'image/jpeg',
    });

    const resizedBuffer = await sharp(bufferData).resize({ width: 384 }).jpeg({ quality: 100 }).toBuffer();
    await bucket.file(`images/${fileName}/resized.jpg`).save(resizedBuffer, {
        resumable: false,
        contentType: 'image/jpeg'
    })

    const dziDir = path.join(process.cwd(), "dzi_output");
    await fs.ensureDir(dziDir);

    await sharp(bufferData)
        .tile({ size: 256, layout: "dz" })
        .toFile(path.join(dziDir, "output"));

    const outputDzi = path.join(dziDir, "output.dzi");

    const dziDestination = `images/${fileName}/${fileName}_dzi/output.dzi`
    await bucket.upload(outputDzi, { destination: dziDestination, resumable: false, contentType: 'application/xml' });

    const outputFilesDir = path.join(dziDir, "output_files");
    const folders = await fs.readdir(outputFilesDir);

    for (const folder of folders) {

        const folderPath = path.join(outputFilesDir, folder);
        const stats = await fs.stat(folderPath);

        if (stats.isDirectory()) {

            const images = await fs.readdir(folderPath);
            for (const image of images) {
                const imagePath = path.join(folderPath, image);
                const destination = `images/${fileName}/${fileName}_dzi/output_files/${folder}/${image}`;
                await bucket.upload(imagePath, { destination, resumable: false, contentType: 'image/jpeg' });
            }

        } else {

            const destination = `images/${fileName}/${fileName}_dzi/output_files/${folder}`;
            await bucket.upload(folderPath, { destination, resumable: false, contentType: 'application/xml' });
        }
    }

    await prisma.image.create({
        data: {
            previewImageUrl: `images/${fileName}/resized.jpeg`,
            fullImageUrl: `images/${fileName}/full.jpeg`,
            title,
            description,
            categoryId
        }
    })

}
