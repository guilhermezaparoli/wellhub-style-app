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

}