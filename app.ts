import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email})
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        this.users.push(user)
    }
    removeUser(email: string): void {
        const index = this.users.findIndex(user => user.email === email)
        if (index !== -1) {
            this.users.splice(index, 1)
        }
        else {
            throw new Error('User not found.')
        }
    }
    
    registerBike(bike: Bike): void {
        const existingBike = this.bikes.find(existing => existing.id === bike.id)
        
        if (existingBike) {
            throw new Error('Duplicate bike ID.')
        }

        this.bikes.push(bike)
    }

    rentBike(userEmail: string, bikeId: string, startDate: Date, endDate: Date): void {
        const user = this.findUser(userEmail)
        if(!user) {
            throw new Error('User not found.')
        }

        const bike = this.bikes.find(bike => bike.id === bikeId)
        if(!bike) {
            throw new Error('Bike not found.')
        }
        const rent = Rent.create(this.rents, bike, user, startDate, endDate)
        this.rents.push(rent)
    }

    returnBike(userEmail: string, bikeId: string, returnDate: Date ): void {
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bike = this.bikes.find(bike => bikeId === bikeId) 
        if(!bike) {
            throw new Error('Bike not found.')
        }
        const activeRent = this.rents.find(
            rent =>
                rent.bike.id === bikeId &&
                rent.user.email === userEmail &&
                rent.dateReturned === undefined
        )

        if (!activeRent) {
            throw new Error('Active rental not found.')
        }

        activeRent.dateReturned = returnDate
    }


}
