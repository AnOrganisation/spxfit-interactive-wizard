// components/hero.tsx
"use client";
import ImageContainer from "@/components/ImageContainer";
import SidePanel from "@/components/SidePanel";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
      <section className="w-full h-full">
        <ImageContainer />
      </section>
      <SidePanel />
      <section className="absolute flex items-center justify-center p-3 left-40 top-10">
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
