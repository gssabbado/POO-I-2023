import { BikeRepo } from "../../ports/bike-repo"
import { Bike } from "../../bike"
import prisma from "./db";

export class PrismaBikeRepo implements BikeRepo {

    async find(id: string): Promise<Bike> {
        const bike = await prisma.bike.findUnique({
            where: { id },
        })
        if (!bike) {
            throw new Error("Bike not found");
        }
        return bike
    }

    async add(bike: Bike): Promise<string> {
        const addedBike = await prisma.bike.create({
            data: { ...bike },
        });
        return addedBike.id
    }

    async remove(id: string): Promise<void> {
        await prisma.bike.delete({
            where: { id },
        })
    }

    async update(id: string, updatedBike: Bike): Promise<void> {
        await prisma.bike.update({
            where: { id },
            data: { ...updatedBike },
        })
    }

    async list(): Promise<Bike[]> {
        return await prisma.bike.findMany({})
    }
}
