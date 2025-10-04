"use client";

import FixedGlobe from "@/components/Globes/FixedGlobe";
import { IGetSite } from "@/types/catalogs";

import { useRouter } from "next/navigation";

export default function Menu({sites}: {sites: IGetSite[]}) {

    const router = useRouter();

    return (
        <main className="h-full flex flex-col items-center justify-center relative">

            <h1 className="text-6xl text-center m-12">Choose an option for starting</h1>
            <div className="w-full h-5/6 overflow-hidden flex justify-evenly items-center">
                {sites.map((globe) => (
                    <div
                        key={globe.siteId}
                        className={`
                  flex flex-col items-center w-1/5
                  transform transition-all duration-700
                  cursor-pointer
                `}
                onClick={() => router.push(`/site/${globe.siteId}`)}
                    >
                        <FixedGlobe globeImg={globe.imageUrl} site={globe.name} />
                    </div>
                ))}
            </div>
        </main>
    );
}
