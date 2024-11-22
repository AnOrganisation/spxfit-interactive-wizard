import { Button } from "@nextui-org/button";
import { useState } from "react";

interface ButtonData {
  id: string;
  color: string;
  onClick: () => void;
}

interface ItemProps {
  ButtonDataList: ButtonData[];
  Label: string;
}

export default function Item({ ButtonDataList, Label }: ItemProps) {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  const handleButtonClick = (id: string, onClick: () => void) => {
    setActiveButtonId(id);
    onClick();
  };

  return (
    <div>
      <h2 className="flex items-center justify-center">{Label}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {ButtonDataList.map((button) => (
          <Button
            isIconOnly
            key={button.id}
            onPress={() => handleButtonClick(button.id, button.onClick)}
            radius="full"
            size="sm"
            className={` ${
              activeButtonId === button.id ? "ring-2 ring-slate-200" : ""
            }`}
          >
            {button.color}
          </Button>
        ))}
      </div>
    </div>
  );
}
