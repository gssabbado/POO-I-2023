import { Location } from "./location";

export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public available: boolean,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public id?: string,
        public location: Location = new Location(0.0, 0.0),
        ) {}
}