import {
  Building2,
  Columns3,
  Droplets,
  Grid3x3,
  House,
  Layers,
  MoveVertical,
  PaintRoller,
  BrickWall,
  Ruler,
  Construction,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  bridge: Construction,
  layers: Layers,
  paint: PaintRoller,
  building: Building2,
  lift: MoveVertical,
  droplet: Droplets,
  home: House,
  grid: Grid3x3,
  foundation: BrickWall,
  column: Columns3,
  beam: Ruler,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Construction;
  return <Icon className={className} strokeWidth={1.6} />;
}
