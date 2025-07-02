/* eslint-disable no-console */
import fastify from 'fastify';
import { AppRoutes } from './http/routes.js';
import { ZodError } from 'zod';
import { env } from './env/index.js';

export const app = fastify();

app.register(AppRoutes)
app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error',
            issues: error.format()
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: Here we should log to an external tool like datadog/NewRelic/Sentry
    }

    return response.status(500).send({
        message: 'Internal server error.'
    })
})