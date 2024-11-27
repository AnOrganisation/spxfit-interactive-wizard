// components/hero.tsx
"use client";
import { useState } from "react";
import ImageContainer from "@/components/ImageContainer";
import SidePanel from "@/components/SidePanel";
import Image from "next/image";

export default function Hero() {
  const [activeSteelImage, setActiveSteelImage] = useState<string>("");
  const [activeBenchImage, setActiveBenchImage] = useState<string>("");
  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
      <section className="w-full h-full">
        <ImageContainer
          activeSteelImage={activeSteelImage}
          activeBenchImage={activeBenchImage}
        />
      </section>
      <SidePanel
        setActiveSteelImage={setActiveSteelImage}
        setActiveBenchImage={setActiveBenchImage}
      />
      <section className="absolute flex items-center justify-center p-3 -top-20 mobile:-top-20 mobile:left-1">
        <Image
          alt="SPX Logo"
          className="object-contain w-56 h-56"
          src="/logo.png"
          width={437}
          height={106}
        />
      </section>
    </div>
  );
}
