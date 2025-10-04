import CustomGlobe from "@/components/Globes/CustomGlobe";
import { getPointsBySite, getSiteData } from "@/lib/functions/get";
import { IGetPoint } from "@/types/catalogs";

export default async function Site({params}: {params: {siteId: string}}) {
    const siteId = await Number(params.siteId);

    const siteData = await getSiteData(siteId);
    const pointsResult = await getPointsBySite(siteId);
    const sitePoints: IGetPoint[] = Array.isArray(pointsResult) ? pointsResult : [];

    return (
        <CustomGlobe imageUrl={siteData?.imageBase64 || ""} points={sitePoints} />
    )
}
