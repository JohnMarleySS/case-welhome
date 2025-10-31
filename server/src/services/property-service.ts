import { PrismaClient, Property } from "@prisma/client";

const prisma = new PrismaClient();

interface CreatePropertyParams {
    title: string;
    address: string;
    status: "active" | "inactive";
}

export class PropertyService {
    async findAll(): Promise<Property[]> {
        const results = await prisma.property.findMany();
        return results
    }

    async create(data: CreatePropertyParams) {
        const newProperty = await prisma.property.create({
            data: {
                title: data.title,
                address: data.address,
                status: data.status,
            }
        })
        return newProperty;
    }

    async update(data: Property): Promise<Property> {
        const updated = await prisma.property.update({
            where: { id: data.id },
            data: {
                address: data.address,
                title: data.title,
                status: data.status,
            }
        })
        return updated;
    }

    async delete(id: number): Promise<Property> {
        const deleted = await prisma.property.delete({
            where: { id }
        })
        return deleted;
    }
}