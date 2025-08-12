import { defineConfig } from 'vitest/config'


export default defineConfig({
    plugins: [],
    test: {
        projects: [
        {
                test: {
                    name: 'prisma',
                    include: ['src/http/controller/**/*.spec.ts'],
                    environment: 'prisma'
                }
            }
        ]
    }
})