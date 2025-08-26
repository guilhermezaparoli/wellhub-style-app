
import 'dotenv/config'
import { PrismaClient } from 'generated/prisma/index.js';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest/environments';


function generateUrlDatabase(schema: string) {

    if(!process.env.DATABASE_URL){
        throw new Error('Please provide a DATABASE_URL environment')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment> {
    name: 'prisma',
    transformMode: 'web',
    async setup() {
        const prisma = new PrismaClient()

        const schema = randomUUID()
        const databaseUrl = generateUrlDatabase(schema)

        process.env.DATABASE_URL = databaseUrl

        execSync('npx prisma migrate deploy')
        return {
           async teardown() {
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
            await prisma.$disconnect()
           }
        }
    }
}