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

  //State to track whether to display steel and bench images in side-view or not.
  const [view2, setView2] = useState<boolean>(false);

  const handleViewButtonClick = () => {
    setView2((prevView2) => {
      const newView2 = !prevView2;
      // Update steel image
      const steelPath = activeSteelImage
        .replace("/Metal/", "/Metal_View2/")
        .replace(".webp", "_View2.webp");
      const regularSteelPath = activeSteelImage
        .replace("/Metal_View2/", "/Metal/")
        .replace("_View2.webp", ".webp");
      setActiveSteelImage(newView2 ? steelPath : regularSteelPath);

      // Update bench image
      const benchPath = activeBenchImage.includes("_Stitch")
        ? activeBenchImage
            .replace("/Bench_Stitch/", "/Bench_Stitch_View2/")
            .replace(".webp", "_View2.webp")
        : activeBenchImage
            .replace("/Bench_NoStitch/", "/Bench_NoStitch_View2/")
            .replace(".webp", "_View2.webp");
      const regularBenchPath = activeBenchImage.includes("_Stitch_View2")
        ? activeBenchImage
            .replace("/Bench_Stitch_View2/", "/Bench_Stitch/")
            .replace("_View2.webp", ".webp")
        : activeBenchImage
            .replace("/Bench_NoStitch_View2/", "/Bench_NoStitch/")
            .replace("_View2.webp", ".webp");
      setActiveBenchImage(newView2 ? benchPath : regularBenchPath);

      return newView2;
    });
  };

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
        view2={view2}
      />

      {/* Controls Section */}
      <section className="absolute flex items-center justify-center p-3 bottom-20 left-20 mobile:bottom-[335px] mobile:left-5">
        <Button
          isIconOnly
          className="bg-transparent"
          size="md"
          onPress={handleViewButtonClick}
        >
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
