"use client";

import { IGetPoint } from "@/types/catalogs";
import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";

export default function CustomGlobe({ imageUrl, points }: { imageUrl: string, points: IGetPoint[] }) {
    const globeRef = useRef<GlobeMethods | null>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;

    }, []);

    const elegantColors = ['#4B2E3A', '#1A1F71', '#2F4F4F', '#3B0A45', '#264653'];

    const mappedPoints = points.map(p => ({
        ...p,
        imageTitle: p.imageTitle,
        lat: p.pointLat,
        lng: p.pointLng,
        color: elegantColors[Math.floor(Math.random() * elegantColors.length)]
    }));

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
            />
        </div>
    );
}
