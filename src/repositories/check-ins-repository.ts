import { CheckIn, Prisma } from 'generated/prisma/index.js';

export interface CheckinsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    save(checkIn: CheckIn): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    getAmountCheckInsByUserId(userId: string): Promise<number>
    findById(id: string): Promise<CheckIn | null>
}