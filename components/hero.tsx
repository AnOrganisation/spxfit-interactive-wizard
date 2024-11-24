// hero.tsx
"use client";
import Image from "next/image";
import { Divider } from "@nextui-org/divider";
import { useState, useRef, useEffect } from "react";
import DisclosurePanel from "@/components/disclosurePanel";
import disclosureData from "@/data/disclosureData.json";

export default function Hero() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const isDragging = useRef(false);
  const imagePosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const prevZoomLevel = useRef(zoomLevel);

  const updateTransform = () => {
    const { x, y } = imagePosition.current;
    const transform = `translate(${x}px, ${y}px) scale(${zoomLevel})`;
    setTransformStyle(transform);
  };

  // Update transform when zoomLevel changes
  useEffect(() => {
    const zoomRatio = zoomLevel / prevZoomLevel.current;

    // Adjust image position to maintain the current view
    imagePosition.current.x *= zoomRatio;
    imagePosition.current.y *= zoomRatio;

    clampImagePosition();
    updateTransform();

    prevZoomLevel.current = zoomLevel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomLevel]);

  // Function to handle mouse down (start dragging)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only proceed if left mouse button is pressed
    if (zoomLevel <= 1) return; // Only enable dragging when zoomed in

    isDragging.current = true; // Activate pan mode
    lastMousePosition.current = { x: e.clientX, y: e.clientY };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Prevent default behavior (e.g., image drag)
    e.preventDefault();
  };

  // Function to handle mouse move (dragging)
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return; // Only proceed if pan mode is active

    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;

    imagePosition.current.x += deltaX;
    imagePosition.current.y += deltaY;

    lastMousePosition.current = { x: e.clientX, y: e.clientY };

    requestAnimationFrame(() => {
      updateTransform();
    });
  };

  // Function to handle mouse up (stop dragging)
  const handleMouseUp = () => {
    isDragging.current = false; // Deactivate pan mode

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    clampImagePosition();
  };

  // Touch events for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1) return;

    isDragging.current = true;
    const touch = e.touches[0];
    lastMousePosition.current = { x: touch.clientX, y: touch.clientY };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    // Prevent default behavior (e.g., scrolling)
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePosition.current.x;
    const deltaY = touch.clientY - lastMousePosition.current.y;

    imagePosition.current.x += deltaX;
    imagePosition.current.y += deltaY;

    lastMousePosition.current = { x: touch.clientX, y: touch.clientY };

    requestAnimationFrame(() => {
      updateTransform();
    });
  };

  const handleTouchEnd = () => {
    isDragging.current = false; // Deactivate pan mode

    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("touchcancel", handleTouchEnd);

    clampImagePosition();
  };

  // Prevent images from being dragged outside of their container
  const clampImagePosition = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const contentWidth = containerWidth * zoomLevel;
      const contentHeight = containerHeight * zoomLevel;

      const maxX = (contentWidth - containerWidth) / 2;
      const maxY = (contentHeight - containerHeight) / 2;

      imagePosition.current.x = Math.max(
        -maxX,
        Math.min(maxX, imagePosition.current.x)
      );
      imagePosition.current.y = Math.max(
        -maxY,
        Math.min(maxY, imagePosition.current.y)
      );

      updateTransform();
    }
  };

  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
      <section className="w-full h-full">
        {/* Container for Images */}
        <div
          className="relative w-full h-full overflow-hidden"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            cursor:
              zoomLevel > 1
                ? isDragging.current
                  ? "grabbing"
                  : "grab"
                : "default",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: transformStyle,
              willChange: "transform",
            }}
          >
            {/* Overlaying Images */}
            <Image
              priority
              alt="Equation 1"
              className="object-contain w-full h-full pointer-events-none select-none"
              height={4320}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              src="/eq1.png"
              unoptimized={zoomLevel > 1}
              width={7680}
              draggable={false}
            />
            {/* Add more images here, transparent ones*/}
            {/* <Image
              priority
              alt="Overlay Image"
              className="absolute top-0 left-0 object-contain w-full h-full pointer-events-none select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              height={1080}
              width={1920}
              unoptimized={zoomLevel > 1}
              src="/eq2.png"
              draggable={false}
            /> */}
          </div>
        </div>
        {/* Zoom Slider outside the image container */}
        <input
          className="absolute z-10 w-32 p-2 rounded-lg bottom-10 left-40 bg-white/80"
          max="2"
          min="1"
          step="0.01"
          type="range"
          value={zoomLevel}
          onChange={(e) => {
            setZoomLevel(parseFloat(e.target.value));
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        />
      </section>
      {/* ... rest of your code remains unchanged ... */}
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
        />
      </section>
    </div>
  );
}
