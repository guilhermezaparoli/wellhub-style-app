import { PrismaCheckInsRepositories } from 'src/repositories/prisma/prisma-check-ins-repository.js';
import { CheckinUseCase } from '../check-in.js';
import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository.js';

export function makeCheckInUseCase() {

    const checkinsRepository = new PrismaCheckInsRepositories()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckinUseCase(checkinsRepository, gymsRepository)

    return useCase
}