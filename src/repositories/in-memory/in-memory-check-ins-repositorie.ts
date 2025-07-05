import { Prisma, CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from '../check-ins-repository.js';
import { randomUUID } from 'node:crypto';

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

}