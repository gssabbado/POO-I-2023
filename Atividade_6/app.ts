import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import { Crypt } from "./crypt"
//import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
//    crypt: Crypt = new Crypt[]

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email})
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
//        const newId = crypto.randomUUID()
//      const encryptedPassoword: string = await this.crypt.encrypt(user.password)
//        user.id = newId

        this.users.push(user)
//        return newId
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

    diffHours_payment(bike: Bike): number {
        const date1 = new Date();
        const date2 = new Date()
        date2.setDate(date2.getDate() + 1)

        const hours = (date2.getDate() - date1.getDate())/3600000
        const payment = hours*bike.rate

        return payment
    }


    rentBike(userEmail: string, bikeId: string): void {
        const user = this.findUser(userEmail)
        if(!user) {
            throw new Error('User not found.')
        }

        const bike = this.bikes.find(bike => bike.id === bikeId)
        if(!bike) {
            throw new Error('Bike not found.')
        }

        if(!bike.available) {
            throw new Error('Bike not available')
        }
        const rent = Rent.create(this.rents, bike, user)
        bike.available = false
        this.rents.push(rent)
    }

    returnBike(userEmail: string, bikeId: string, returnDate: Date): void {
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
        bike.available = true
    }

    getUser(): User[] {
        return this.users
    }

    getBike(): Bike[] {
        return this.bikes
    }

    getRent(): Rent[] {
        return this.rents
    }

    autheticateUser(userEmail: string, password: string): User | undefined {
        const user = this.findUser(userEmail)
        if (user && user.password === password) {
            return user
        }
        return undefined
    }
/*
    async signIn(userEmail: string, password: string): Promise<boolean> {
        const user = this.findUser(userEmail)
        if (!user) throw new Error ('User not found.')
        return await this.crypt.compare(password, user.password)
    }
*/

//Função de atualizar a localização da bicicleta
    updateBikeLocation(bikeId: string, Latitude: number, Longitude: number): void {
        const bike = this.bikes.find(bike => bikeId === bikeId)

        if (!bike) {
            throw new Error ('Bike not found.')
        }
        bike.latitude = Latitude
        bike.longitude = Longitude
    }
    
}

