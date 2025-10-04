"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";

export default function FixedGlobe({ globeImg, site }: { globeImg: string; site: string }) {
    const globeRef = useRef<GlobeMethods | null>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.15;

        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
    }, []);

    return (
        <div
            className="group relative flex flex-col items-center justify-center"
            style={{ width: 400, height: 400 }}
        >
            <div
                className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    width: "400px",
                    height: "400px",
                    background:
                        "radial-gradient(circle, rgba(0,150,255,0.4) 30%, rgba(0,150,255,0) 70%)",
                }}
            />

            <div className="rounded-full overflow-hidden transform transition-transform duration-500 group-hover:scale-105 hover:cursor-pointer">
                <Globe
                    ref={globeRef}
                    globeImageUrl={globeImg}
                    backgroundColor="rgba(0,0,0,0)"
                    width={400}
                    height={400}
                />
            </div>
            <h2 className="text-2xl text-[#ededed] text-center">{site} taken photos</h2>
        </div>
    );
}
