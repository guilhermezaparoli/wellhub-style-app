import { PrismaCheckInsRepositories } from 'src/repositories/prisma/prisma-check-ins-repository.js';
import { ValidateCheckinUseCase } from '../validate-check-in.js';

export function makeGetUserCountCheckInsUseCase() {

    const checkInsRepository = new PrismaCheckInsRepositories()
    const useCase = new ValidateCheckinUseCase(checkInsRepository)

    return useCase
}