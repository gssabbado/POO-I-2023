import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])
const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)

const app = new App()
const userList: User[] = app.getUser()
const bikeList: Bike[] = app.getBike()
const rentList: Rent[] = app.getRent()
app.registerUser(new User('Joao Luiz', 'jojo@mail.com', '5566','1'))
app.registerUser(new User('Renato', 'rabbit@mail.com', 'pamonha123','2'))
app.registerBike(new Bike('Caloi 369', 'Road',  20, 100, 800, 'Inacreditavel, impressionante e inabalavel', 4.7, ['image1.jpg'], '1'))
app.registerBike(new Bike('BMX 157', 'Road',  18, 150, 500, 'Mais rápido que relâmpago marquinhos.', 4.5, ['image2.jpg'], '2'))
app.rentBike('rabbit@mail.com', '1', today, sevenDaysFromToday)

if (app.autheticateUser('rabbit@mail.com', 'pamonha23')) {
    console.log('User and password are correct.')
}
else {
    console.log('User and password are wrong.')
}

console.log(userList)
console.log(bikeList)
console.log(rentList)

//console.log(app.findUser('maria@mail.com'))
//console.log(app.rentBike())
//console.log(app.rentBike('maria@mail.com'))