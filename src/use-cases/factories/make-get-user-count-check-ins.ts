import { PrismaCheckInsRepositories } from 'src/repositories/prisma/prisma-check-ins-repository.js';
import { GetUserCountCheckInsUseCase } from '../get-user-count-check-ins.js';

export function makeGetUserCountCheckInsUseCase() {

    const checkInsRepository = new PrismaCheckInsRepositories()
    const useCase = new GetUserCountCheckInsUseCase(checkInsRepository)

    return useCase
}