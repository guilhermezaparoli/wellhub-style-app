import { CheckinsRepository } from 'src/repositories/check-ins-repository.js';


interface GetUserCountCheckInsUseCaseRequest {
    userId: string
}

interface GetUserCountCheckInsUseCaseResponse {
    amountCheckIns: number
}

export class GetUserCountCheckInsUseCase {
    constructor(private checkInsRepository: CheckinsRepository) { }


    async execute({ userId }: GetUserCountCheckInsUseCaseRequest): Promise<GetUserCountCheckInsUseCaseResponse> {

        const amountCheckIns = await this.checkInsRepository.getAmountCheckInsByUserId(userId)


        return {
            amountCheckIns
        }
    }
}