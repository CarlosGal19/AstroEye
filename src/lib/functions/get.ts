import { IGetSite } from "@/types/catalogs";

import { PrismaClient } from "../generated";

import { Storage } from "@google-cloud/storage";
import path from "path";

const prisma = new PrismaClient();

const storage = new Storage({
    keyFilename: path.join(process.cwd(), "gcp-key.json"),
});

const bucketName = "bucket_astro_eye";

export async function getSites(): Promise<IGetSite[]> {
    const sites = await prisma.site.findMany({
        select: {
            siteId: true,
            name: true,
            imageUrl: true, // ruta dentro del bucket
        },
    });

    const sitesWithBase64 = await Promise.all(
        sites.map(async (site) => {
            const file = storage.bucket(bucketName).file(site.imageUrl);
            const [buffer] = await file.download();

            const ext = site.imageUrl.split(".").pop()?.toLowerCase();
            const mime = ext === "png" ? "image/png" : "image/jpeg";

            const base64 = buffer.toString("base64");

            return {
                siteId: site.siteId,
                name: site.name,
                imageUrl: `data:${mime};base64,${base64}`,
            };
        })
    );
    return sitesWithBase64;
}

export async function getPointsBySite(siteId: number) {
    try {
        const points = await prisma.point.findMany({
            select: {
                pointId: true,
                longitude: true,
                latitude: true
            },
            where: {
                siteId
            }
        })

        return points.map(p => ({
            pointId: p.pointId,
            location: {
                lat: p.latitude,
                lng: p.longitude
            }
        }));
    } catch {
        return "Error to fetch points";
    }
}

export async function getPointData(pointId: number) {
    try {
        const point = await prisma.point.findFirst({
            select: {
                siteId: true,
                image: {
                    select: {
                        title: true,
                        description: true,
                        previewImageUrl: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
            },
            where: {
                pointId
            }
        })

        return point;
    } catch {
        return "Error to fetch point data"
    }
}

export async function getPointPhoto(pointId: number) {
    try {
        const point = await prisma.point.findFirst({
            select: {
                pointId: true,
                image: {
                    select: {
                        title: true,
                        description: true,
                        fullImageUrl: true
                    }
                },
            },
            where: {
                pointId
            }
        })

        return point;
    } catch {
        return "Error to fetch point image"
    }
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            select: {
                categoryId: true,
                name: true
            }
        })

        return categories
    } catch {
        return "Error to get categories"
    }
}

export async function getImagesByCategory(pageNumber: number = 1, categoryId?: number | null) {
    try {
        const images = await prisma.image.findMany({
            select: {
                imageId: true,
                title: true,
                previewImageUrl: true,
                category: {
                    select: {
                        name: true
                    }
                }
            },
            where: categoryId
                ? { categoryId }
                : {},
            take: 15,
            skip: 15 * (pageNumber - 1)
        })

        return images;
    } catch {
        return "Error to get images";
    }
}
