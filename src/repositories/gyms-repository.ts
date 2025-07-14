import { Gym, Prisma } from 'generated/prisma/index.js';

export interface GymsRepository {
    findById(gymId: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}