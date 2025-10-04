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
