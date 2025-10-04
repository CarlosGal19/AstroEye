import CustomGlobe from "@/components/Globes/CustomGlobe";
import { getSiteData } from "@/lib/functions/get";

export default async function Site({params}: {params: {siteId: string}}) {
    const siteId = await Number(params.siteId);

    const siteData = await getSiteData(siteId);

    return (
        <CustomGlobe imageUrl={siteData?.imageBase64 || ""} />
    )
}
