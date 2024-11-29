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
      <img
        alt="Metal"
        className="object-contain w-full h-full pointer-events-none select-none"
        src={activeSteelImage}
        draggable={false}
      />
      <img
        alt="Upholstery"
        className="absolute top-0 left-0 object-contain w-full h-full pointer-events-none select-none"
        src={activeBenchImage}
        draggable={false}
      />
    </>
  );
}
