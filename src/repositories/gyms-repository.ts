import { Gym } from 'generated/prisma/index.js';

export interface GymsRepository {
    findById(gymId: string): Promise<Gym | null>
}