import Item from "@/components/item";

interface ButtonData {
  id: string;
  color: string;
}

interface ItemData {
  label: string;
  buttonData: ButtonData[];
}

interface DisclosurePanelProps {
  disclosurePanelName: string;
  items: ItemData[];
}

export default function DisclosurePanel({
  disclosurePanelName,
  items,
}: DisclosurePanelProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <h2>{disclosurePanelName}</h2>
      {items.map((item) => (
        <Item
          key={item.label}
          ButtonDataList={item.buttonData}
          Label={item.label}
        />
      ))}
    </section>
  );
}
