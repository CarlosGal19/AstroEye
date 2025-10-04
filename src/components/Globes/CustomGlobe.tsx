"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";
import type { ICustomGlobe } from "@/types/Components";
import { IGetPoint, IGetPointData } from "@/types/catalogs";
import PointData from "../Modal/PointData";

export default function CustomGlobe({ imageUrl, points }: ICustomGlobe) {

    const globeRef = useRef<GlobeMethods | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<IGetPoint | null>(null);
    const [pointData, setPointData] = useState<IGetPointData | null>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;
    }, []);

    const colorOptions = ['#4B2E3A', '#1A1F71', '#2F4F4F', '#3B0A45', '#264653'];

    const mappedPoints = points.map(p => ({
        ...p,
        imageTitle: p.imageTitle,
        lat: p.pointLat,
        lng: p.pointLng,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)]
    }));

    const handlePointClick = async (point: any) => {
        setSelectedPoint(point);

        const res = await fetch(`/api/pointData?pointId=${point.pointId}`);
        const data: IGetPointData = await res.json();
        setPointData(data);
    };

    return (
        <div className="overflow-hidden w-full h-11/12">
            <Globe
                ref={globeRef}
                globeImageUrl={imageUrl}
                backgroundImageUrl="/background/8k_stars_milky_way.jpg"
                pointsData={mappedPoints}
                pointAltitude={0.025}
                pointRadius={2}
                pointColor="color"
                pointResolution={16}
                pointsTransitionDuration={500}
                pointLabel="imageTitle"
                onPointClick={handlePointClick}
            />

            {selectedPoint && pointData && (
                <PointData pointData={pointData} setPointData={setPointData} setSelectedPoint={setSelectedPoint} />
            )}

        </div>
    );
}
