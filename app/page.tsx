"use client";
import Item from "@/components/item";

export default function Home() {
  const buttonData = [
    { id: "btn1", color: "Violet", onClick: () => alert("Button 1 clicked") },
    { id: "btn2", color: "Indigo", onClick: () => alert("Button 2 clicked") },
    { id: "btn3", color: "Blue", onClick: () => alert("Button 3 clicked") },
    { id: "btn4", color: "Green", onClick: () => alert("Button 4 clicked") },
    { id: "btn5", color: "Yellow", onClick: () => alert("Button 5 clicked") },
    { id: "btn6", color: "Orange", onClick: () => alert("Button 6 clicked") },
    { id: "btn7", color: "Red", onClick: () => alert("Button 7 clicked") },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      Hi
      <Item ButtonDataList={buttonData} Label="SpxFit Presents" />
      <Item ButtonDataList={buttonData} Label="SpxFit Presents" />
      <Item ButtonDataList={buttonData} Label="SpxFit Presents" />
      <Item ButtonDataList={buttonData} Label="SpxFit Presents" />
      <Item ButtonDataList={buttonData} Label="SpxFit Presents" />
      <Item ButtonDataList={buttonData} Label="SpxFit Presents" />
    </section>
  );
}
