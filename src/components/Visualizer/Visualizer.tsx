"use client";

import { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";
import { IGetImageData } from "@/types/catalogs";

export default function ImageViewer({ title, description, imageUrl }: IGetImageData) {

    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        const viewer = OpenSeadragon({
            element: viewerRef.current,
            prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
            tileSources: imageUrl,
            showNavigator: true,
            navigatorPosition: "TOP_RIGHT",
        });

        return () => viewer.destroy();
    }, []);

    return (
        <div
            ref={viewerRef}
            style={{ width: "100%", height: "600px", backgroundColor: "#000" }}
        />
    );
};
