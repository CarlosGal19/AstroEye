"use client";

import FixedGlobe from "@/components/FixedGlobe";
import { IGetSite } from "@/types/catalogs";
import { useEffect, useState } from "react";

export default function Menu() {

  const [globes, setGlobes] = useState<IGetSite[]>([]);

  // const globes = [
  //   { img: "globe/2k_moon.jpg", site: "Moon" },
  //   { img: "globe/2k_mars.jpg", site: "Mars" },
  // ];

  useEffect(() => {
    async function fetchSites() {
      try {
        const data = await fetch("/api/sites");
        const fetchedGlobes = await data.json();
        setGlobes(fetchedGlobes);
      } catch (error) {
        alert(error);
      }
    }

    fetchSites();
  }, []);

  return (
    <main className="h-full flex flex-col items-center justify-center relative">

      <h1 className="text-6xl text-center m-16">Choose an option for starting</h1>
      <div className="w-full h-5/6 overflow-hidden flex justify-evenly items-center">
        {globes.map((globe) => (
          <div
            key={globe.siteId}
            className={`
                  flex flex-col items-center w-1/5
                  transform transition-all duration-700
                  cursor-pointer
                `}
          >
            <FixedGlobe globeImg={globe.imageUrl} site={globe.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
