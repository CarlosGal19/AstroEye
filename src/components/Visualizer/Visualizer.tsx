import { IGetImageData } from "@/types/catalogs";

export default function ImageViewer({ imageData }: { imageData: IGetImageData }) {
    return (
        <>
            <h1>{imageData.title}</h1>
            <p>{imageData.description}</p>
            {imageData.imageUrl && <img src={imageData.imageUrl} alt={imageData.title} />}
        </>
    )
}
