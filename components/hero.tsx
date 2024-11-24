"use client";
import Image from "next/image";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import DisclosurePanel from "@/components/disclosurePanel";
import disclosureData from "@/data/disclosureData.json";

export default function Hero() {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
      <section className="w-full h-full">
        <div className="relative w-full h-full">
          <Image
            priority
            alt="Equation 1"
            className="object-contain w-full h-full transition-transform duration-300"
            height={4320}
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            src="/eq1.png"
            style={{ transform: `scale(${zoomLevel})` }}
            unoptimized={zoomLevel > 1}
            width={7680}
          />
          <input
            className="absolute w-32 p-2 rounded-lg bottom-10 left-40 bg-white/80"
            max="2"
            min="1"
            step="0.01"
            type="range"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
          />
        </div>
      </section>
      <section className="absolute right-40 top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center gap-4 py-5 wizard md:py-5 bg-[#1d1d1d] w-80 rounded-lg shadow-[6px_6px_10px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl text-[#979f7e] pt-2">Chest Press PL</h1>
        <Divider className="w-10/12 h-[1px] my-1 bg-[#979f7e]" />
        <DisclosurePanel disclosureData={disclosureData} />
      </section>
      <section className="absolute flex items-center justify-center p-3 left-40 top-10">
        <Image
          alt="SPX Logo"
          className="object-contain w-56 h-56"
          src="/logo.png"
          width={437}
          height={106}
        ></Image>
      </section>
    </div>
  );
}
