// disclosurePanel.tsx

import Item from "@/components/item";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import "swiper/css"; // Import swiper styles
import { useState } from "react";

interface ButtonData {
  id: string;
  color: string;
}

interface ItemData {
  label: string;
  buttonData: ButtonData[];
}

interface DisclosurePanelData {
  disclosurePanelName: string;
  items: ItemData[];
}

interface DisclosurePanelProps {
  disclosureData: DisclosurePanelData[];
  setActiveSteelImage(value: string): void;
  setActiveBenchImage(value: string): void;
  isCarouselView: boolean;
  view2: boolean;
}

export default function DisclosurePanel({
  disclosureData,
  setActiveSteelImage,
  setActiveBenchImage,
  isCarouselView,
  view2,
}: DisclosurePanelProps) {
  // State to manage the current panel index (for carousel view)
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  // State to manage active buttons and colors
  const [activeButtonColors, setActiveButtonColors] = useState<{
    [itemLabel: string]: string;
  }>({});
  const [activeButtonIds, setActiveButtonIds] = useState<{
    [itemLabel: string]: string;
  }>({});

  // Function to handle going to the previous panel
  const handlePrev = () => {
    setCurrentPanelIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : disclosureData.length - 1
    );
  };

  // Function to handle going to the next panel
  const handleNext = () => {
    setCurrentPanelIndex((prevIndex) =>
      prevIndex < disclosureData.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Handler to set active button color and ID for a specific item
  const handleSetActiveButtonColor = (
    itemLabel: string,
    color: string,
    buttonId: string
  ) => {
    setActiveButtonColors((prevColors) => ({
      ...prevColors,
      [itemLabel]: color,
    }));
    setActiveButtonIds((prevIds) => ({
      ...prevIds,
      [itemLabel]: buttonId,
    }));
  };

  // Current panel based on index (for carousel view)
  const currentPanel = disclosureData[currentPanelIndex];
  const currentItem = currentPanel.items[0]; // Assuming we only show the first item of the current panel

  //State to handle upholstery stitch off or on
  const [upholsteryStitch, setUpholsteryStitch] = useState<boolean>(true);

  return isCarouselView ? (
    // Render a carousel for mobile view based on the currentPanel
    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-red-600">
      <div className="flex flex-row justify-between w-10/12 border-2 border-yellow-300 h-1/2">
        <div>
          {/* Button to scroll to the previous panel */}
          <Button
            isIconOnly
            radius="full"
            size="md"
            className="bg-[#979f7e]"
            onPress={handlePrev}
          >
            <Image
              alt="chevron left"
              src="/chevron-left.png"
              width={30}
              height={30}
            />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-[#979f7e] text-xl font-semibold">
            {/* Display the current panel's disclosurePanelName */}
            {currentPanel.disclosurePanelName}
          </div>
          <div className="text-[#979f7e] text-medium">
            {/* Display the current item's label */}
            {currentItem.label}
          </div>
        </div>
        <div>
          {/* Button to scroll to the next panel */}
          <Button
            isIconOnly
            radius="full"
            size="md"
            className="bg-[#979f7e]"
            onPress={handleNext}
          >
            <Image
              alt="chevron right"
              src="/chevron-right.png"
              width={30}
              height={30}
            />
          </Button>
        </div>
      </div>
      <div
        id="scroll-container"
        className="w-full rounded-full bg-[#1d1d1d] h-2/3 flex items-center overflow-x-auto gap-2 p-4 touch-pan-x" // Enable touch-pan-x for better horizontal swipe handling
        draggable={false} // Ensure the entire container is not draggable
      >
        {/* Rendering Item component for the current item */}
        <Item
          ButtonDataList={currentItem.buttonData}
          disclosurePanelName={currentPanel.disclosurePanelName}
          setActiveButtonColor={(color: string, buttonId: string) =>
            handleSetActiveButtonColor(currentItem.label, color, buttonId)
          }
          setActiveSteelImage={setActiveSteelImage}
          setActiveBenchImage={setActiveBenchImage}
          upholsteryStitch={upholsteryStitch}
          setUpholsteryStitch={setUpholsteryStitch}
          view2={view2}
        />
      </div>
    </div>
  ) : (
    // Render the accordion for desktop view
    <Accordion selectionMode="multiple" defaultExpandedKeys={["Steel"]}>
      {disclosureData.map((panel) => (
        <AccordionItem
          key={panel.disclosurePanelName}
          title={panel.disclosurePanelName}
          classNames={{
            title:
              "text-center text-[#979f7e] text-xl flex items-center justify-center ml-8",
          }}
        >
          {panel.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center mb-4"
            >
              <h3 className="mb-2 text-md text-[#979f7e] items-center justify-center ml-2">
                {/* **Display the active color specific to this item** */}
                {activeButtonColors[item.label] || ""}
              </h3>
              <Item
                ButtonDataList={item.buttonData}
                disclosurePanelName={panel.disclosurePanelName}
                activeButtonId={activeButtonIds[item.label]}
                setActiveButtonColor={(color: string, buttonId: string) =>
                  handleSetActiveButtonColor(item.label, color, buttonId)
                }
                setActiveSteelImage={setActiveSteelImage}
                setActiveBenchImage={setActiveBenchImage}
                upholsteryStitch={upholsteryStitch}
                setUpholsteryStitch={setUpholsteryStitch}
                view2={view2}
              />
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
