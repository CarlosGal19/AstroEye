"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";

export default function CustomGlobe({imageUrl}: {imageUrl: string}) {
    const globeRef = useRef<GlobeMethods | null>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;

    }, []);

    return (
        <div className="overflow-hidden w-full h-11/12">
            <Globe
                ref={globeRef}
                globeImageUrl={imageUrl}
                backgroundImageUrl="/background/8k_stars_milky_way.jpg"
            />
        </div>
    );
}
