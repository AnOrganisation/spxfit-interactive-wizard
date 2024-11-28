// components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import ImageContainer from "@/components/ImageContainer";
import SidePanel from "@/components/SidePanel";
import Image from "next/image";
import Head from "next/head";
import disclosureData from "@/data/disclosureData.json"; // Adjust the path accordingly
import { Button } from "@nextui-org/button";

interface ButtonData {
  id: string;
  color: string;
  src_stitch?: string;
  src_nostitch?: string;
  src_stitch_view2?: string;
  src_nostitch_view2?: string;
}

interface ItemData {
  label: string;
  buttonData: ButtonData[];
}

interface DisclosurePanelData {
  disclosurePanelName: string;
  items: ItemData[];
}

export default function Hero() {
  const [activeSteelImage, setActiveSteelImage] = useState<string>(
    "/Metal/Metal_Black.webp"
  );
  const [activeBenchImage, setActiveBenchImage] = useState<string>(
    "/Bench_Stitch/Bench_Black_Stitch.webp"
  );

  // Extract all image paths from disclosureData.json
  const imagePaths: string[] = [];

  disclosureData.forEach((panel: DisclosurePanelData) => {
    panel.items.forEach((item: ItemData) => {
      item.buttonData.forEach((button: ButtonData) => {
        if (button.src_stitch) {
          imagePaths.push(button.src_stitch);
        }
        if (button.src_nostitch) {
          imagePaths.push(button.src_nostitch);
        }
        if (button.src_stitch_view2) {
          imagePaths.push(button.src_stitch_view2);
        }
        if (button.src_nostitch_view2) {
          imagePaths.push(button.src_nostitch_view2);
        }
        // Add any additional imageSrc properties here if present
      });
    });
  });

  // Optionally, add any static images you want to preload
  const staticImagePaths: string[] = [
    "/Logo.png",
    // Add more static image paths here if needed
  ];

  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
      {/* Preload Images */}
      <Head>
        {imagePaths.map((src, index) => (
          <link key={index} rel="preload" as="image" href={src} />
        ))}
        {staticImagePaths.map((src, index) => (
          <link key={`static-${index}`} rel="preload" as="image" href={src} />
        ))}
      </Head>

      {/* Main Content */}
      <section className="w-full h-full">
        <ImageContainer
          activeSteelImage={activeSteelImage}
          activeBenchImage={activeBenchImage}
        />
      </section>

      {/* Side Panel with Buttons */}
      <SidePanel
        setActiveSteelImage={setActiveSteelImage}
        setActiveBenchImage={setActiveBenchImage}
      />

      {/* Controls Section */}
      <section className="absolute flex items-center justify-center p-3 bottom-20 left-20">
        <Button isIconOnly className="bg-transparent" size="md">
          <Image alt="view button" src="/view.png" width={65} height={64} />
        </Button>
      </section>

      {/* Logo Section */}
      <section className="absolute flex items-center justify-center p-3 -top-20 mobile:-top-20 mobile:left-1">
        <Image
          alt="SPX Logo"
          className="object-contain w-56 h-56"
          src="/logo.png"
          width={437}
          height={106}
          priority // Ensures the logo loads immediately
        />
      </section>
    </div>
  );
}
