import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


export async function getContacts(accountId:string) {
  return prisma.contact.findMany({ where: { accountId }});
}

export async function getContactsByGroup(contactGroupId: string) {
  return prisma.contact.findMany({ where: { contactGroupId } });
}

export async function getContact(id: string) {
    return prisma.contact.findUnique({ where: { id } });
}

export async function getFavorites(accountId: string) {
    return prisma.contact.findMany({ where: { accountId, isFavorite: true } });
}

export async function insertContact(contact: any) {
    return prisma.contact.create({ data: contact });
}

// export async function getUpcomingContacts(contactGroupId: string, accountId: string) {
//   return prisma.contact.findMany({
//       where: {
//           accountId,
//           contactGroupId,
//           contactDate: {
//               gt: new Date()
//           }
//       }
//   });
// }