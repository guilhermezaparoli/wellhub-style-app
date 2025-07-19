import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository.js';
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.js';

export function makeGetUserCountCheckInsUseCase() {

    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}