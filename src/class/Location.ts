// location parameters
export class Location {
  id: number;
  name: string;
  coordinates: [number, number];
  showSymbol: boolean;
  hint: string;

  constructor(
    id: number,
    name: string,
    coordinates: [number, number],
    showSymbol: boolean,
    hint: string | null = "No hint available"
  ) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
    this.showSymbol = showSymbol;
    this.hint = hint ?? "No hint available"; // fallback if null
  }
}
