import Item from "@/components/item";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

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
}
export default function DisclosurePanel({
  disclosureData,
}: DisclosurePanelProps) {
  return (
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
