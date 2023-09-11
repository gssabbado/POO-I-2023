import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    private constructor(
        public bike: Bike,
        public user: User,
        public dateReturned?: Date
    ) {}

    static create(rents: Rent[], bike: Bike, user: User): Rent {
        const canCreate = Rent.canRent(rents, true)
        if (canCreate) return new Rent(bike, user)
        throw new Error('Overlapping dates.')
    }

    static canRent(rents: Rent[], available: boolean): boolean {
        for (const rent of rents) {
            if (available === false) {
                return false
            }
        }
        return true
    }
}

