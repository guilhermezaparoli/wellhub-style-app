import { CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from 'src/repositories/check-ins-repository.js';
import { ResourceNotFoundError } from './errors/resource-not-found.js';


interface ValidateCheckinUseCaseRequest {
    checkInId: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {

    constructor(
        private checkInsRepository: CheckinsRepository
    ) { }


    async execute({ checkInId }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {

        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}