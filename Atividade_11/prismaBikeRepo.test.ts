import { PrismaClient } from "@prisma/client"
import { PrismaBikeRepo } from "../src/external/database/prisma-bike-repo"
import { Bike } from "../src/bike"

const prisma = new PrismaClient()
const prismaBikeRepo = new PrismaBikeRepo()

beforeAll(async () => {
  prisma._prismaConfigUrl = "file:./src/external/db"
  await prisma.$queryRaw`CREATE DATABASE IF NOT EXISTS db;`
  await prisma.$queryRaw`USE db;`
  await prisma.$executeRaw("CREATE TABLE ...")

});

afterAll(async () => {
  await prisma.$queryRaw`DROP DATABASE IF EXISTS db;`
  await prisma.$disconnect()
})




describe("PrismaBikeRepo", () => {
    it("deve encontrar uma bicicleta por ID", async () => {
        const bike = new Bike('Vrum Vrum 2000', 'Mountain Bike',
        1234, 1234, 100.0, 'Harder, Better, Faster, Stronger', 5, [])
        await prisma.bike.create({ data: bike })
        const result = await prismaBikeRepo.find(bike.id!)
        expect(result).toEqual(bike)
    })

    it("deve adicionar uma bicicleta", async () => {
        const bike = new Bike('Vrum Vrum 2000', 'Mountain Bike',
        1234, 1234, 100.0, 'Harder, Better, Faster, Stronger', 5, [])
        const id = await prismaBikeRepo.add(bike)
        const result = await prisma.bike.findUnique({ where: { id } })
        expect(result).toEqual(bike)
    })

    it("deve remover uma bicicleta por ID", async () => {
        const bike = new Bike('Vrum Vrum 2000', 'Mountain Bike',
        1234, 1234, 100.0, 'Harder, Better, Faster, Stronger', 5, [])
        await prisma.bike.create({ data: bike })
        await prismaBikeRepo.remove(bike.id!)
        const result = await prisma.bike.findUnique({ where: { id: bike.id } })
        expect(result).toBeNull()
    })

    it("deve atualizar uma bicicleta", async () => {
        const bike = new Bike('Vrum Vrum 2000', 'Mountain Bike',
        1234, 1234, 100.0, 'Harder, Better, Faster, Stronger', 5, [])
        await prisma.bike.create({ data: bike })

        const updatedBike = { ...bike, name: "Updated Bike" }
        await prismaBikeRepo.update(bike.id!, updatedBike)

        const result = await prisma.bike.findUnique({ where: { id: bike.id } })
        expect(result).toEqual(updatedBike)
    });

    it("deve listar todas as bicicletas", async () => {
        const bikes = [new Bike('Vrum Vrum 2000', 'Mountain Bike',
        1234, 1234, 100.0, 'Harder, Better, Faster, Stronger', 5, []), 
        new Bike('Voorhees 369', 'Road',
        1234, 1234, 100.0, 'Amazing killer bike', 5, [])]
        await prisma.bike.createMany({ data: bikes })
        const result = await prismaBikeRepo.list()
        expect(result).toEqual(bikes)
    })
})
