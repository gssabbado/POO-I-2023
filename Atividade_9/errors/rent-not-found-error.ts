import { BikeNotFoundError } from "./bike-not-found-error";

export class RentNotFoundError extends Error {
    constructor() {
        super("Rent not found")
        this.name = 'RentNotFoundError'
    }
}