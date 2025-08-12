import { Prisma, User } from '.../../generated/prisma/index.js';
import { prisma } from '../../lib/prisma.js';
import { UsersRepository } from '../users-repository.js';

export class PrismaUsersRepository implements UsersRepository {
   
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async create(data: Prisma.UserCreateInput) {

        const user = await prisma.user.create({
            data
        })

        return user
    }

    async findById(id: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }
}