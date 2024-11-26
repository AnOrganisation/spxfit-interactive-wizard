// Item.tsx

import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";

interface ButtonData {
  id: string;
  color: string;
}

interface ItemProps {
  ButtonDataList: ButtonData[];
}

export default function Item({ ButtonDataList }: ItemProps) {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  // Prevent default dragging for all buttons within this Item component
  useEffect(() => {
    const handleDragStart = (e: Event) => {
      e.preventDefault();
    };
    // Select only the buttons within this Item component
    const buttons = document.querySelectorAll(
      `button[data-item-id="${ButtonDataList[0].id}"]`
    );
    buttons.forEach((button) =>
      button.addEventListener("dragstart", handleDragStart)
    );
    // Cleanup
    return () => {
      buttons.forEach((button) =>
        button.removeEventListener("dragstart", handleDragStart)
      );
    };
  }, [ButtonDataList]);

  // Updated gradientColorMap with only specified colors
  const gradientColorMap: { [key: string]: { start: string; end: string } } = {
    Black: { start: "#000000", end: "#000000" },
    "Fir Green": { start: "#3e4827", end: "#3e4827" },
    Brown: { start: "#4e3629", end: "#4e3629" },
    Grey: { start: "#888b8d", end: "#888b8d" },
    Ivory: { start: "#e3deca", end: "#e3deca" },
    Charcoal: { start: "#4b4f54", end: "#4b4f54" },
    White: { start: "#FFFFFF", end: "#FFFFFF" },
    Navy: { start: "#002855", end: "#002855" },
    Bronze: { start: "#84754e", end: "#84754e" },
    "Pastel Blue": { start: "#7da1c4", end: "#7da1c4" },
    "Wine Red": { start: "#300505", end: "#300505" }, // Ensure 6-digit hex
    "Tactical Green": { start: "#98a07f", end: "#98a07f" },
  };

  const handleButtonClick = (id: string, color: string) => {
    setActiveButtonId(id); // Activate the clicked button, deactivate others in this Item
    alert(`Button ${color} clicked`);
  };

  return (
    <>
      <div
        className="
        flex 
        flex-wrap 
        justify-center 
        gap-4 
        px-14 
        py-4 
        mobile:px-4 
        mobile:py-6 
        mobile:min-h-[4rem] 
        mobile:flex-row 
        mobile:flex-nowrap 
        mobile:justify-center 
        mobile:items-center 
        mobile:overflow-x-auto
      "
      >
        {ButtonDataList.map((button) => {
          const gradientColors = gradientColorMap[button.color];
          const isGradient = !!gradientColors;

          const gradientStyle = isGradient
            ? {
                background: `radial-gradient(108.76% 95.18% at 20.89% 30.38%, ${gradientColors!.start} 22.5%, ${gradientColors!.end} 100%)`,
                transform:
                  activeButtonId === button.id ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.2s ease-in-out",
              }
            : {
                backgroundColor: /^#([0-9A-F]{3}){1,2}$/i.test(button.color)
                  ? button.color
                  : undefined,
                transform:
                  activeButtonId === button.id ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.2s ease-in-out",
              };

          return (
            <Button
              key={button.id}
              isIconOnly
              className={`
              ring-1 ring-slate-200
              ${activeButtonId === button.id ? "ring-4 ring-[#979f7e]" : ""}
            `}
              style={gradientStyle}
              radius="full"
              size="sm"
              onPress={() => handleButtonClick(button.id, button.color)}
              draggable={false}
              data-item-id={button.id}
              aria-pressed={activeButtonId === button.id} // Accessibility attribute
            />
          );
        })}
      </div>
    </>
  );
}
