// components/OverlayImages.tsx
import Image from "next/image";

interface OverlayImagesProps {
  activeSteelImage: string;
  activeBenchImage: string;
  zoomLevel: number;
}

export default function OverlayImages({
  zoomLevel,
  activeSteelImage,
  activeBenchImage,
}: OverlayImagesProps) {
  return (
    <>
      <Image
        priority
        alt="Metal Ivory"
        className="object-contain w-full h-full pointer-events-none select-none"
        height={2160}
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        src={activeSteelImage}
        unoptimized={zoomLevel > 1}
        width={3840}
        draggable={false}
      />
      <Image
        priority
        alt="Overlay Image"
        className="absolute top-0 left-0 object-contain w-full h-full pointer-events-none select-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        height={2160}
        width={3840}
        quality={100}
        unoptimized={zoomLevel > 1}
        src={activeBenchImage}
        draggable={false}
      />
    </>
  );
}
