import { Button } from "@nextui-org/button";
import { useState } from "react";

interface ButtonData {
  id: string;
  color: string;
}

interface ItemProps {
  ButtonDataList: ButtonData[];
  Label: string;
}

export default function Item({ ButtonDataList, Label }: ItemProps) {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  const handleButtonClick = (id: string, color: string) => {
    setActiveButtonId(id);
    alert(`Button ${color} clicked`);
  };

  return (
    <div>
      <h2 className="flex items-center justify-center">{Label}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {ButtonDataList.map((button) => (
          <Button
            key={button.id}
            isIconOnly
            className={` ${
              activeButtonId === button.id ? "ring-2 ring-slate-200" : ""
            }`}
            radius="full"
            size="sm"
            onPress={() => handleButtonClick(button.id, button.color)}
          >
            {button.color}
          </Button>
        ))}
      </div>
    </div>
  );
}
