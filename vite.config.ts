import path from 'path'
import { defineConfig } from 'vitest/config'


export default defineConfig({
    plugins: [],
    test: {
        projects: [
        {
                test: {
                    name: 'prisma',
                    include: ['src/http/controller/**/*.spec.ts'],
                    environment: 'prisma/vitest-environment-prisma/prisma-test-environment.ts'
                },
                resolve: {
                    alias: {
                        'src': path.resolve(__dirname, './src')
                    }
                }
                
            },
            {
                
                test: {
                    name: 'default',
                    include: ['src/use-cases/**/*.spec.ts'],
                    environment: 'node'
                }
            }
        ]
    }
})