import { PrismaClient } from "../generated";

const prisma = new PrismaClient();

export async function getSites() {
    try {
        const sites = await prisma.site.findMany({
            select: {
                siteId: true,
                name: true,
                imageUrl: true
            }
        })

        return sites
    } catch {
        return "Error to get sites"
    }
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
