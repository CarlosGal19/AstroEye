import { getImagePhoto } from "@/lib/functions/get";
import { IGetImageData } from "@/types/catalogs";

import ImageViewer from "@/components/Visualizer/Visualizer";

export default async function Visualizer(props: {params: Promise<{imageId: string}>}) {
    const params = await props.params;
    const imageId = await Number(params.imageId);

    const imageData: IGetImageData = await getImagePhoto(imageId);

    return (
        <ImageViewer title={imageData.title} description={imageData.description} imageUrl={imageData.imageUrl} />
    );
}
