import { CheckIn } from 'generated/prisma/index.js';
import { CheckinsRepository } from 'src/repositories/check-ins-repository.js';
import { ResourceNotFoundError } from './errors/resource-not-found.js';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error.js';


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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes')

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}