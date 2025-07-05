import { Prisma, CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from '../check-ins-repository.js';
import { prisma } from 'src/lib/prisma.js';

export class PrismaCheckInsRepositories implements CheckinsRepository {

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }


}