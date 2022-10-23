import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export type Group = {
    id: string;
    groupName: string;
    contactFrequency: number;
    color: string;
};

export async function getGroups(accountId: string) {
    return prisma.contactGroup.findMany({ where: {accountId} });
}

export async function getGroup(id: string) {
    return prisma.contactGroup.findUnique({ where: { id } });
}

export async function insertGroup(group: any) {
    console.log("\n\n\nGROUP", group);
    return prisma.contactGroup.create({ data: group });
}