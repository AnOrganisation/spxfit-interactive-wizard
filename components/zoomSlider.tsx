// components/ZoomSlider.tsx
interface ZoomSliderProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

export default function ZoomSlider({
  zoomLevel,
  setZoomLevel,
}: ZoomSliderProps) {
  return (
    <input
      className="absolute z-10 w-32 p-2 rounded-lg bottom-10 left-40 bg-white/80"
      max="2"
      min="1"
      step="0.01"
      type="range"
      value={zoomLevel}
      onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    />
  );
}
