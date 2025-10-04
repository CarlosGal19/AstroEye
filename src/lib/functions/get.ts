import { PrismaClient } from "../generated";

const prisma = new PrismaClient();

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
                title: true,
                description: true,
                previewImageUrl: true,
                category: {
                    select: {
                        name: true
                    }
                }
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
                title: true,
                fullImageUrl: true,
                description: true
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

export async function getPointsByCategory(pageNumber: number = 1, categoryId?: number | null) {
    try {
        const points = await prisma.point.findMany({
            select: {
                pointId: true,
                title: true,
                previewImageUrl: true,
                category: {
                    select: {
                        name: true
                    }
                },
                site: {
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
        });

        return points;
    } catch {
        return "Error to get points";
    }
}
