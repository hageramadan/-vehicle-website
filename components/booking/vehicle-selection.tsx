import { VehicleCards } from "../vehicle-cards";

export function VehicleSelection({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return <VehicleCards selected={selected} onSelect={onSelect} />;
}
