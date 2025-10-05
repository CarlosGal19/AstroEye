export interface IGetSite {
    siteId: number;
    name: string;
    imageUrl: string;
}

export interface IGetPoint {
    pointId: number;
    pointLat: number;
    pointLng: number;
    imageTitle?: string;
}

export interface IGetPointData {
    pointId: number;
    siteId: number;
    imageId: number | null;
    title: string | null;
    description: string | null;
    category: string | null;
    imageBase64: string | null;
}

export interface IGetImageData {
    title?: string;
    description?: string;
    imageUrl?: string;
}

export interface IGetCategories {
    categoryId: number;
    name: string
}
