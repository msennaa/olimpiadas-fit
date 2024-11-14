import amqp from 'amqplib';
import Queue from '../../application/Queue/Queue';

export class RabbitMQAdapter implements Queue {
    connection: any;

    constructor() {
    }

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://localhost');

    }

    async disconnect(): Promise<void> {
        this.connection.close();
    }

    async setup(exchange: string, queue: string): Promise<void> {
        const channel = await this.connection.createChannel();
        if (!exchange) await channel.assertExchange(exchange, 'direct', { durable: true });
        if (!queue) await channel.assertQueue(queue, { durable: true });
        if (!queue) await channel.bindQueue(queue, exchange, '');
    }

    async consume(queue: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        channel.consume(queue, async function (msg: any) {
            const input = JSON.parse(msg.content.toString());
            await callback(input);
            channel.ack(msg);
        })

    }

    async publish(exchange: string, data: any): Promise<void> {
        const channel = await this.connection.createChannel();
        channel.publish(exchange, '', Buffer.from(JSON.stringify(data)));
    }
}
