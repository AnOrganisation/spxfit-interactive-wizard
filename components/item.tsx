import { Button } from "@nextui-org/button";
import { useState } from "react";

interface ButtonData {
  id: string;
  color: string;
}

interface ItemProps {
  ButtonDataList: ButtonData[];
}

export default function Item({ ButtonDataList }: ItemProps) {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

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
    setActiveButtonId(id);
    alert(`Button ${color} clicked`);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 px-14">
        {ButtonDataList.map((button) => {
          const gradientColors = gradientColorMap[button.color] || {
            start: "#FFFFFF",
            end: "#000000",
          };

          const gradientStyle = {
            background: `radial-gradient(108.76% 95.18% at 20.89% 30.38%, ${gradientColors.start} 22.5%, ${gradientColors.end} 100%)`,
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
            />
          );
        })}
      </div>
    </div>
  );
}
