import { Prisma } from 'generated/prisma/index.js';
import { prisma } from 'src/lib/prisma.js';

export class PrismaUsersRepository {

    async create(data: Prisma.UserCreateInput) {

        const user = await prisma.user.create({
            data
        })

        return user
    }
}