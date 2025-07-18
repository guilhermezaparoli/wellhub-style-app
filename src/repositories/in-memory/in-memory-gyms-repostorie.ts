import { Gym, Prisma } from 'generated/prisma/index.js';
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository.js';
import { ResourceNotFoundError } from 'src/use-cases/errors/resource-not-found.js';
import { randomUUID } from 'node:crypto';
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinates.js';

export class InMemoryGymsRepository implements GymsRepository {
    public gyms: Gym[] = []

    async findById(gymId: string) {

        const gym = this.gyms.find((gym) => gym.id === gymId)


        if (!gym) {
            throw new ResourceNotFoundError()
        }

        return gym
    }


    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            longitude: new Prisma.Decimal(data.longitude.toString()),
            latitude: new Prisma.Decimal(data.latitude.toString()),
        }
        this.gyms.push(gym)


        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const gyms = this.gyms.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)

        return gyms
    }

    async findManyNearby(params: FindManyNearbyParams) {

        return this.gyms.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                {
                    latitude: params.latitude,
                    longitude: params.longitude
                },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber()
                })

            return distance < 10
        })

    }
}