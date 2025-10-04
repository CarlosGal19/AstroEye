import { getSites } from "@/lib/functions/get";
import { IGetSite } from "@/types/catalogs";
import Menu from "@/components/Main/Menu";

export default async function Page() {

    const globes: IGetSite[] = await getSites();

    return (
        <Menu sites={globes} />
    );
}
