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
  isCarouselView: boolean;
}

export default function DisclosurePanel({
  disclosureData,
  isCarouselView,
}: DisclosurePanelProps) {
  // State to manage the current panel index
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

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

  // Current panel based on index
  const currentPanel = disclosureData[currentPanelIndex];
  const currentItem = currentPanel.items[0]; // Assuming we only show the first item of the current panel

  return isCarouselView ? (
    // Render a carousel for mobile view based on the currentPanel
    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-red-600">
      <div className="flex flex-row justify-between w-10/12 border-2 border-yellow-300 h-1/2">
        <div>
          {/* This button scrolls to the previous panel in the disclosureData array */}
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
          {/* This button scrolls to the next panel in the disclosureData array */}
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
        className="w-full rounded-full bg-[#1d1d1d] h-2/3 flex items-center overflow-x-auto gap-2 p-4 touch-pan-x " // Enable touch-pan-x for better horizontal swipe handling
        draggable={false} // Ensure the entire container is not draggable
      >
        {/* Rendering Item components for each buttonData in the current item */}
        {/* Pass all buttons to a single Item component */}
        <Item ButtonDataList={currentItem.buttonData} />
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
                {item.label}
              </h3>
              <Item ButtonDataList={item.buttonData} />
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
