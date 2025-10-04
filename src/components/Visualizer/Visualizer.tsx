"use client";

import React, { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";

interface ViewerProps {
  imageUrl?: string; // URL de la imagen
}

const ImageViewer: React.FC<ViewerProps> = ({ imageUrl }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = OpenSeadragon({
        element: viewerRef.current,
        prefixUrl: "/openseadragon/images/", // íconos de zoom
        tileSources: {
          type: "image",
          url: "https://storage.googleapis.com/bucket_astro_eye/images/full/Microgravity.jpg?GoogleAccessId=storageobjectviewerastroeye%40feisty-reef-472618-a6.iam.gserviceaccount.com&Expires=1759620919&Signature=OPzmOwZlBv%2BS2v2eURxi2QKCwsjDCpzb%2BCPc478%2BHks5xXkT0LOihjASesfFMVd5ezqdIsYGS9eRZdxxiNLqSgbfImIGaNE7vc4z5shK6fmqo2mDk1sK6JQbMMXg%2BhXixi59Pdzi4Qq9wSq8ibS086jkxIKGdkO4R9%2BoQ13Dhw8e2Xjd0OQQlqrjCb5wRzAc5ZwewX%2Fy6JZTTtYqjHeOZBs%2BfYnvqVi6icL4OKeoVQER5Bkx8ZomBxOMZI0TvkSfgokAckYYQXkrs3y%2BXW8tT0PDODfzFTzzrCVFkc0UpFZ44LLhQCd2vkeHGkpVFwkrmkfJbHFJr5rAYkwCPkrUhg%3D%3D", // URL por default
        },
        showNavigator: true,
      });

      return () => viewer.destroy();
    }
  }, [imageUrl]);

  return <div ref={viewerRef} style={{ width: "100%", height: "600px" }} />;
};

export default ImageViewer;
