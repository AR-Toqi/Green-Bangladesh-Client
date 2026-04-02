import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

// ── Zone System ──────────────────────────────────────────────────────
export type TZone = "RED" | "ORANGE" | "GREEN";

export type TStringOrObject = string | { name: string };

// ── Backend API Response Types ───────────────────────────────────────
export type TDistrict = {
  _id?: string;
  id?: string;
  name: TStringOrObject;
  division: TStringOrObject;
  area: number;
  estimatedTrees: number;
  treesPerKm2: number;
  score: number; // calculated by backend based on tree density
  zone: TZone; // assigned by backend based on score
};

export type TDistrictResponse = {
  success: boolean;
  message: string;
  data: TDistrict[];
};

export type TSingleDistrictResponse = {
  success: boolean;
  message: string;
  data: TDistrict;
};

// ── GeoJSON Feature Types ────────────────────────────────────────────
export type TDistrictGeoProperties = {
  ADM2_EN: string; // District name in the GeoJSON
  ADM1_EN: string; // Division name in the GeoJSON
  ADM2_PCODE?: string;
  [key: string]: any;
};

export type TDistrictFeature = Feature<
  Polygon | MultiPolygon,
  TDistrictGeoProperties
>;

export type TDistrictFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  TDistrictGeoProperties
>;

// ── Zone Color Configuration ─────────────────────────────────────────
export const ZONE_CONFIG: Record<
  TZone,
  { color: string; hoverColor: string; label: string; description: string }
> = {
  RED: {
    color: "hsl(0, 72%, 45%)",
    hoverColor: "hsl(0, 72%, 55%)",
    label: "Red Zone",
    description: "Critical — Score 1–25",
  },
  ORANGE: {
    color: "hsl(30, 90%, 48%)",
    hoverColor: "hsl(30, 90%, 58%)",
    label: "Orange Zone",
    description: "Moderate — Score 26–50",
  },
  GREEN: {
    color: "hsl(142, 70%, 40%)",
    hoverColor: "hsl(142, 70%, 50%)",
    label: "Green Zone",
    description: "Healthy — Score > 50",
  },
};


