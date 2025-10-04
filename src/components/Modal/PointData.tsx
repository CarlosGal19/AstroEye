import { IGetPoint, IGetPointData } from "@/types/catalogs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PointData({ pointData, setPointData, setSelectedPoint }: { pointData: IGetPointData; setPointData: (data: IGetPointData | null) => void; setSelectedPoint: (pointId: IGetPoint | null) => void }) {

    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-[70%] h-[70%] flex overflow-hidden shadow-lg">

                {pointData.imageBase64 && (
                    <div className="w-1/2 h-full">
                        <Image
                            src={pointData.imageBase64}
                            alt={pointData.title || 'Point Image'}
                            className="w-full h-full object-cover"
                            width={600}
                            height={600}
                            unoptimized
                        />
                    </div>
                )}

                <div className="w-1/2 p-6 flex flex-col justify-between">
                    <div className="overflow-auto mb-4">
                        <h2 className="text-4xl font-bold mb-2">{pointData.title}</h2>
                        <h3 className="text-lg font-semibold mb-4">{pointData.category}</h3>
                        <p className="text-gray-700 text-sm">{pointData.description}</p>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => router.push(`/visualizer/${pointData.imageId}`)}
                        >
                            Open Visualizer
                        </button>
                    </div>

                    <button
                        className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => {
                            setSelectedPoint(null);
                            setPointData(null);
                        }}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    )
}
