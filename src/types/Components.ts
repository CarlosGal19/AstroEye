import { IGetPoint, IGetPointData } from "./catalogs";

export interface IFixedGlobe {
    globeImg: string;
    site: string;
}

export interface ICustomGlobe {
    imageUrl: string;
    points: IGetPoint[];
}

export interface IPointData {
    pointData: IGetPointData;
    setPointData: (data: IGetPointData | null) => void;
    setSelectedPoint: (pointId: IGetPoint | null) => void;
}

export interface IImageCard {
  image: {
    imageId: string | number;
    title: string;
    base64: string;
  };
}
