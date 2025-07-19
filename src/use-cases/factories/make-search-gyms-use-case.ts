import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository.js';
import { SearchGymsUseCase } from '../search-gyms.js';

export function makeGetUserCountCheckInsUseCase() {

    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymsUseCase(gymsRepository)

    return useCase
}