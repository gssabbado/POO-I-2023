import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"
import { jest } from '@jest/globals'

jest.useFakeTimers();

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id!, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id!, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id!, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw bike not found error when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    it('should correctly handle bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id!, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.id).toEqual(user.id)
    })

    it('should throw unavaiable bike error when trying to rent unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id!, user.email)
        expect(() => {
            app.rentBike(bike.id!, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it('should register a user successfully', async () => {
        const app = new App();
        const user = new User('Renato', 'renato@mail.com', '123pass');
        await app.registerUser(user);
        const registeredUser = app.getUserByEmail('renato@mail.com');
        expect(registeredUser).toEqual(user);
    });

    it('should throw an exception when registering a user with a duplicate email', async () => {
        const app = new App();
        const user1 = new User('Jonas', 'jj@mail.com', 'password');
        await app.registerUser(user1);

        const user2 = new User('Julie', 'jj@mail.com', 'password2');

        const registerDuplicateUser = async () => {
            await app.registerUser(user2);
        };

        await expect(registerDuplicateUser).rejects.toThrow('Email already registered');
    });

    it('should register a bike successfully', () => {
        const app = new App();
        const bike = new Bike('Billy Bang', 'Road', 5678, 5678, 150.0, 'Mais rapida do velho oeste', 3, []);
        app.registerBike(bike);
        const registeredBike = app.getBikeById(bike.id!);
        expect(registeredBike).toEqual(bike);
    });

    it('should throw an exception when registering a bike with duplicate ID', () => {
        const app = new App();
        const bike1 = new Bike('Billy Bang', 'Road', 5678, 5678, 150.0, 'Mais rapida do velho oeste', 3, [])
        app.registerBike(bike1);

        const bike2 = new Bike('Vienna', 'Mountain', 5678, 5678, 200.0, 'Vienna my sienna', 4, []);

        const registerDuplicateBike = () => {
            app.registerBike(bike2);
        };

        expect(registerDuplicateBike).toThrow('Bike ID already registered');
    });

    it('should rent a bike to a user successfully', async () => {
        const app = new App();
        const user = new User('Jorge', 'jor@mail.com', 'password');
        await app.registerUser(user);
        const bike = new Bike('Montreal', 'Hybrid', 9876, 9876, 120.0, 'Amazing, Fabulous and Cheaper than any bike', 2, []);
        app.registerBike(bike);

        const rentalStatus = app.rentBike(bike.id!, user.email);
        expect(rentalStatus).toEqual('Bike rented successfully');
    });

    it('should throw an exception when renting an already rented bike', async () => {
        const app = new App();
        const user1 = new User('Adam', 'adam@mail.com', 'password');
        await app.registerUser(user1);
        const user2 = new User('Gus', 'gus@mail.com', 'password2');
        await app.registerUser(user2);

        const bike = new Bike('Mugiwara', 'City', 1357, 1357, 80.0, 'Comfortable bike', 6, []);
        app.registerBike(bike);

        app.rentBike(bike.id!, user1.email);

        const rentAlreadyRentedBike = () => {
            app.rentBike(bike.id!, user2.email);
        };

        await expect(rentAlreadyRentedBike).rejects.toThrow('Bike is already rented');
    });

    it('should return a bike and calculate rent correctly', async () => {
        const app = new App();
        const user = new User('Ace', 'portgas@mail.com', 'password');
        await app.registerUser(user);
        const bike = new Bike('Lighting', 'Road', 2468, 2468, 180.0, 'ZOOOoooomm, Ka-chow', 4, []);
        app.registerBike(bike);

        app.rentBike(bike.id!, user.email);

        const hour = 1000 * 60 * 60;
        jest.advanceTimersByTime(3 * hour)

        const rentAmount = app.returnBike(bike.id!, user.email);
        expect(rentAmount).toEqual(540.0);
    });

    it('should throw an exception when returning an unrented bike', async () => {
        const app = new App();
        const user = new User('Hannah', 'montana@mail.com', 'ordinarygirl');
        await app.registerUser(user);
        const bike = new Bike('Satoru', 'Mountain', 7531, 7531, 220.0, 'The best modern moutain bike', 5, []);
        app.registerBike(bike);

        const returnUnrentedBike = () => {
            app.returnBike(bike.id!, user.email);
        };

        expect(returnUnrentedBike)
    });
})
