import { CheckIn, Prisma } from 'generated/prisma/index.js';

export interface CheckinsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}