import { Gym } from 'generated/prisma/index.js';
import { GymsRepository } from '../gyms-repository.js';
import { ResourceNotFoundError } from 'src/use-cases/errors/resource-not-found.js';

export class InMemoryGymsRepository implements GymsRepository {
    public gyms: Gym[] = []

    async findById(gymId: string) {
        
        const gym = this.gyms.find((gym) => gym.id === gymId)


        if(!gym) {
            throw new ResourceNotFoundError()
        }

        return gym
    }
}