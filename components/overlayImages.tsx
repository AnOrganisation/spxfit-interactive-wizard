// components/OverlayImages.tsx
import Image from "next/image";

interface OverlayImagesProps {
  zoomLevel: number;
}

export default function OverlayImages({ zoomLevel }: OverlayImagesProps) {
  return (
    <>
      <Image
        priority
        alt="Metal Ivory"
        className="object-contain w-full h-full pointer-events-none select-none"
        height={4320}
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        src="/Metal_Ivory.png"
        unoptimized={zoomLevel > 1}
        width={7680}
        draggable={false}
      />
      <Image
        priority
        alt="Overlay Image"
        className="absolute top-0 left-0 object-contain w-full h-full pointer-events-none select-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        height={4320}
        width={7680}
        quality={100}
        unoptimized={zoomLevel > 1}
        src="/Bench_Rustic_Stitch.png"
        draggable={false}
      />
    </>
  );
}
