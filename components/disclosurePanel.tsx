// disclosurePanel.tsx

import Item from "@/components/item";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import Image from "next/image";
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

interface FlattenedItemData {
  panelName: string;
  item: ItemData;
}

export default function DisclosurePanel({
  disclosureData,
  setActiveSteelImage,
  setActiveBenchImage,
  isCarouselView,
  view2,
}: DisclosurePanelProps) {
  // Flattened array of items with panel information
  const flattenedItems: FlattenedItemData[] = disclosureData.flatMap((panel) =>
    panel.items.map((item) => ({
      panelName: panel.disclosurePanelName,
      item,
    }))
  );

  // State to manage the current item index (for carousel view)
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Helper function to generate a unique key
  const getItemKey = (panelName: string, itemLabel: string) =>
    `${panelName}-${itemLabel}`;

  // State to manage active buttons and colors
  const [activeButtonColors, setActiveButtonColors] = useState<{
    [key: string]: string;
  }>({});
  const [activeButtonIds, setActiveButtonIds] = useState<{
    [key: string]: string;
  }>({});

  // Function to handle going to the previous item
  const handlePrev = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flattenedItems.length - 1
    );
  };

  // Function to handle going to the next item
  const handleNext = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex < flattenedItems.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Handler to set active button color and ID for a specific item
  const handleSetActiveButtonColor = (
    panelName: string,
    itemLabel: string,
    color: string,
    buttonId: string
  ) => {
    const key = getItemKey(panelName, itemLabel);
    setActiveButtonColors((prevColors) => ({
      ...prevColors,
      [key]: color,
    }));
    setActiveButtonIds((prevIds) => ({
      ...prevIds,
      [key]: buttonId,
    }));
  };

  // Get the current item and panel name
  const currentItemData = flattenedItems[currentItemIndex];
  const currentPanelName = currentItemData.panelName;
  const currentItem = currentItemData.item;

  // State to handle upholstery stitch off or on
  const [upholsteryStitch, setUpholsteryStitch] = useState<boolean>(true);

  return isCarouselView ? (
    // Render a carousel for mobile view based on the current item
    <div className="flex flex-col items-center justify-center w-full h-32">
      <div className="flex flex-row justify-between w-10/12 h-1/2">
        <div>
          {/* Button to scroll to the previous item */}
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
            {currentPanelName}
          </div>
          <div className="text-[#979f7e] text-medium">
            {/* Display the current item's label */}
            {currentItem.label}
          </div>
        </div>
        <div>
          {/* Button to scroll to the next item */}
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
        className="w-full rounded-full bg-[#1d1d1d] h-2/3 flex items-center overflow-x-auto gap-2 p-4 touch-pan-x"
        draggable={false}
      >
        {/* Rendering Item component for the current item */}
        <Item
          ButtonDataList={currentItem.buttonData}
          disclosurePanelName={currentPanelName}
          activeButtonId={
            activeButtonIds[getItemKey(currentPanelName, currentItem.label)]
          }
          setActiveButtonColor={(color: string, buttonId: string) =>
            handleSetActiveButtonColor(
              currentPanelName,
              currentItem.label,
              color,
              buttonId
            )
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
                {/* Display the active color specific to this item */}
                {activeButtonColors[
                  getItemKey(panel.disclosurePanelName, item.label)
                ] || ""}
              </h3>
              <Item
                ButtonDataList={item.buttonData}
                disclosurePanelName={panel.disclosurePanelName}
                activeButtonId={
                  activeButtonIds[
                    getItemKey(panel.disclosurePanelName, item.label)
                  ]
                }
                setActiveButtonColor={(color: string, buttonId: string) =>
                  handleSetActiveButtonColor(
                    panel.disclosurePanelName,
                    item.label,
                    color,
                    buttonId
                  )
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
