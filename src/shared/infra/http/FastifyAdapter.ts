import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import HttpServer from '../../application/http/HttpServer';

export class FastifyAdapter implements HttpServer {
    app: FastifyInstance;

    constructor() {
        this.app = Fastify();
    }

    register(method: string, url: string, callback: Function): void {
        (this.app as any)[method](url.replace(/\{|\}/g, ''), async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const { params, body } = request;
                const output = await callback(params, body);
                reply.send(output);
            } catch (error: any) {
                reply.status(422).send({
                    message: error.message,
                });
            }
        });
    }

    listen(port: number): void {
        this.app.listen({ port });

    }
}
