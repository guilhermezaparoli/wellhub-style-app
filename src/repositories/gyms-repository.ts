import { Gym, Prisma } from 'generated/prisma/index.js';

export interface FindManyNearbyParams {
    latitude: number
    longitude: number
}
export interface GymsRepository {
    findById(gymId: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}