export class Location {
  id: number;
  name: string;
  coordinates: [number, number];
  showSymbol: boolean;

  constructor(id: number, name: string, coordinates: [number, number], showSymbol: boolean) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
    this.showSymbol = showSymbol;
  }
}
