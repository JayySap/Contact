import { Account, PrismaClient } from '@prisma/client';
import cuid from 'cuid';

const prisma = new PrismaClient()

export async function getAccounts() {
    return prisma.account.findMany();
}

export async function getAccountById(id:string) {
    return prisma.account.findUnique({ where: { id: id } });
}

export async function getAccountByEmail(email:string) {
    return prisma.account.findUnique({ where: { email: email } });
}

export async function findOrCreate(account: any) {
    const hasAccount = await prisma.account.findUnique({ where: { email: account.emails[0].value } });

    if(hasAccount) {
        return hasAccount;
    }

    else {
        const accountFormatted = {
            id: cuid(),
            firstName: account.name.givenName,
            lastName: account.name.familyName,
            email: account.emails[0].value,
            type: 'default',
            provider: account.provider
        }
        console.log("accountFormatted", accountFormatted)

        await prisma.account.create({ data: accountFormatted })

        return accountFormatted as Account;
    }


}