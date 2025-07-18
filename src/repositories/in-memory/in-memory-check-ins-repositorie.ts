import { Prisma, CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from '../check-ins-repository.js';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckinsRepository {

    public checkIns: CheckIn[] = [];


    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.checkIns.push(checkIn)

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnsameDay = this.checkIns.find((checkin) => {

        const checkInDate = dayjs(checkin.created_at)
        const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkin.user_id === userId && isOnSameDate
        })

        if (!checkInOnsameDay) {
            return null
        }

        return checkInOnsameDay
    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = this.checkIns
                    .filter((checkIn) => checkIn.user_id === userId)
                    .slice((page - 1) * 20, page * 20)

        return checkIns
    }

    async getAmountCheckInsByUserId(userId: string): Promise<number> {
        const amountCheckIns = this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
        
        return amountCheckIns
    }

    async findById(id: string) {
        const checkIn = this.checkIns.find((item) => item.id === id)

        if(!checkIn){
            return null
        }

        return checkIn 
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.checkIns.findIndex(item => item.id === checkIn.id)

        if(checkInIndex >= 0){
            this.checkIns[checkInIndex] = checkIn
        }

        return checkIn
    }

}