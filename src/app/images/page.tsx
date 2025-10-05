import { getImagesByCategory } from "@/lib/functions/get";
import ImageCard from "@/components/Image/CustomImage";

export default async function ImagesPage() {
  const images = await getImagesByCategory();

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-10">
        Most Viewed Images
      </h1>

      {images && images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard key={image.imageId} image={image} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-400">
          No images available.
        </p>
      )}
    </main>
  );
}
