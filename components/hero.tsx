"use client";
import Image from "next/image";
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
            className="absolute w-32 p-2 rounded-lg bottom-10 left-4 bg-white/80"
            max="2"
            min="1"
            step="0.01"
            type="range"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
          />
        </div>
      </section>
      <section className="absolute flex flex-col items-center justify-center gap-4 py-8 border-2 wizard md:py-10 border-slate-500">
        {disclosureData.map((panel) => (
          <DisclosurePanel
            key={panel.disclosurePanelName}
            disclosurePanelName={panel.disclosurePanelName}
            items={panel.items}
          />
        ))}
      </section>
    </div>
  );
}
