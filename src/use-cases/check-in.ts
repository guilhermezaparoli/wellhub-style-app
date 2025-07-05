import { CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from 'src/repositories/check-ins-repository.js';


interface CheckinUseCaseRequest {
    userId: string
    gymId: string
}
interface CheckinUseCaseResponse {
    checkIn: CheckIn
}
export class CheckinUseCase {

    constructor(private checkInsRepository: CheckinsRepository) { }


    async execute({ userId, gymId }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn
        }
    }
}