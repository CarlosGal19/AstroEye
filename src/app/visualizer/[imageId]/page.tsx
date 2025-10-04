import { getImagePhoto } from "@/lib/functions/get";
import { IGetImageData } from "@/types/catalogs";

import ImageViewer from "@/components/Visualizer/Visualizer";

export default async function Visualizer({params}: {params: {imageId: string}}) {
    const imageId = await Number(params.imageId);

    const imageData: IGetImageData = await getImagePhoto(imageId);

    return (
        <ImageViewer imageData={imageData} />
    );

}
