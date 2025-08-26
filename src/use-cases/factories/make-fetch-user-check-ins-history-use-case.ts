import { PrismaCheckInsRepositories } from 'src/repositories/prisma/prisma-check-ins-repository.js';
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history.js';

export function makeFetchUserCheckInsHistory() {

    const checkInsRepository = new PrismaCheckInsRepositories()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}