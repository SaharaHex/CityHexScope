// location parameters
export class Location {
  id: number;
  name: string;
  coordinates: [number, number];
  showSymbol: boolean;
  zoom: number;
  hint: string;

  constructor(
    id: number,
    name: string,
    coordinates: [number, number],
    showSymbol: boolean,
    zoom: number | null = 16,
    hint: string | null = "No hint available"
  ) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
    this.showSymbol = showSymbol;
    this.zoom = zoom ?? 16;
    this.hint = hint ?? "No hint available"; // fallback if null
  }
}
