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

  // Define a mapping from color names to gradient colors
  const gradientColorMap: { [key: string]: { start: string; end: string } } = {
    Violet: { start: "#EE82EE", end: "#9400D3" },
    Indigo: { start: "#4B0082", end: "#2E0854" },
    Blue: { start: "#1E90FF", end: "#00008B" },
    Green: { start: "#00FF7F", end: "#006400" },
    Yellow: { start: "#FFFF00", end: "#FFD700" },
    Orange: { start: "#FFA500", end: "#FF4500" },
    Red: { start: "#FF6347", end: "#8B0000" },
    Turquoise: { start: "#40E0D0", end: "#008080" },
    Magenta: { start: "#FF00FF", end: "#800080" },
    Cyan: { start: "#00FFFF", end: "#008B8B" },
    Slate: { start: "#708090", end: "#2F4F4F" },
    Gray: { start: "#D3D3D3", end: "#696969" },
    White: { start: "#FFFFFF", end: "#F5F5F5" },
    Black: { start: "#000000", end: "#2F2F2F" },
    Silver: { start: "#C0C0C0", end: "#A9A9A9" },
    Gold: { start: "#FFD700", end: "#B8860B" },
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
          const gradientColors = gradientColorMap[button.color] || {
            start: "#FFFFFF",
            end: "#000000",
          };

          const gradientStyle = {
            background: `radial-gradient(108.76% 95.18% at 20.89% 30.38%, ${gradientColors.start} 22.5%, ${gradientColors.end} 100%)`,
            transform: activeButtonId === button.id ? "scale(1.2)" : "scale(1)", // Scale the button when active
            transition: "transform 0.2s ease-in-out", // Add transition for smooth scaling
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
              draggable={false} // Disable dragging of button
              data-item-id={button.id} // Unique identifier for buttons in this Item
            />
          );
        })}
      </div>
    </>
  );
}
