import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository.js';
import { CreateGymUseCase } from '../create-gym.js';

export function makeGetUserCountCheckInsUseCase() {

    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}