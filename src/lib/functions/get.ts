import { IGetSite } from "@/types/catalogs";

import { PrismaClient } from "../generated";

import { Storage } from "@google-cloud/storage";
import path from "path";

const prisma = new PrismaClient();

const storage = new Storage({
    keyFilename: path.join(process.cwd(), "gcp-key.json"),
});

const bucketName = "bucket_astro_eye";

async function parseToBase64(filePath: string): Promise<string> {
    const file = storage.bucket(bucketName).file(filePath);
    const [buffer] = await file.download();

    const ext = filePath.split(".").pop()?.toLowerCase();
    const mime = ext === "png" ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${buffer.toString("base64")}`;
}

export async function getSites(): Promise<IGetSite[]> {
    const sites = await prisma.site.findMany({
        select: {
            siteId: true,
            name: true,
            imageUrl: true,
        },
    });

    const sitesWithBase64 = await Promise.all(
        sites.map(async (site) => {
            const base64 = await parseToBase64(site.imageUrl);

            return {
                siteId: site.siteId,
                name: site.name,
                imageUrl: base64,
            };
        })
    );
    return sitesWithBase64;
}

export async function getSiteData(siteId: number) {
    const site = await prisma.site.findFirst({
        select: {
            name: true,
            imageUrl: true,
        },
        where: { siteId },
    });

    if (!site) return null;

    const imageBase64 = await parseToBase64(site.imageUrl);

    return {
        name: site.name,
        imageBase64,
    };
}

export async function getPointsBySite(siteId: number) {
    try {
        const points = await prisma.point.findMany({
            select: {
                pointId: true,
                longitude: true,
                latitude: true,
                image: {
                    select: {
                        title: true,
                    }
                }
            },
            where: {
                siteId
            }
        })

        return points.map(p => ({
            pointId: p.pointId,
            pointLat: Number(p.latitude),
            pointLng: Number(p.longitude),
            imageTitle: p.image?.title
        }));
    } catch {
        return "Error to fetch points";
    }
}

export async function getPointData(pointId: number) {
    try {
        const point = await prisma.point.findFirst({
            select: {
                pointId: true,
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

        const imageBase64 = point?.image?.previewImageUrl ? await parseToBase64(point.image.previewImageUrl) : null;

        return {
            pointId,
            siteId: point?.siteId,
            title: point?.image?.title,
            description: point?.image?.description,
            category: point?.image?.category?.name,
            imageBase64
        }
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
        });

        const imageBase64 = point?.image?.fullImageUrl ? await parseToBase64(point.image.fullImageUrl) : null;

        return {
            pointId,
            title: point?.image?.title,
            description: point?.image?.description,
            imageBase64
        }
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

        const imagesWithBase64 = await Promise.all(
            images.map(async (img) => {
                const base64 = img.previewImageUrl ? await parseToBase64(img.previewImageUrl) : null;
                return {
                    imageId: img.imageId,
                    title: img.title,
                    previewImageUrl: img.previewImageUrl,
                    base64
                }
            })
        );

        return imagesWithBase64;
    } catch {
        return "Error to get images";
    }
}
