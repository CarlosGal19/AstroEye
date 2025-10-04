import CustomGlobe from "@/components/Globes/CustomGlobe";
import { getPointsBySite, getSiteData } from "@/lib/functions/get";
import { IGetPoint } from "@/types/catalogs";

export default async function Site(props: {params: Promise<{siteId: string}>}) {
    const params = await props.params;
    const siteId = await Number(params.siteId);

    const siteData = await getSiteData(siteId);
    const pointsResult = await getPointsBySite(siteId);
    const sitePoints: IGetPoint[] = Array.isArray(pointsResult) ? pointsResult : [];

    return (
        <CustomGlobe imageUrl={siteData?.imageBase64 || ""} points={sitePoints} />
    )
}
