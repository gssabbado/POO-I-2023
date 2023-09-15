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
        // longitude e latitude para determinar a localização da bicicleta
        public longitude?: number, 
        public latitude?: number
    ) {}
}