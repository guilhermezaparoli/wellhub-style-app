/* eslint-disable no-console */
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env/index.js';
import { gymsRoutes } from './http/controller/gyms/routes.js';
import { usersRoutes } from './http/controller/users/routes.js';
import { checkInsRoutes } from './http/controller/checkins/routes.js';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)


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