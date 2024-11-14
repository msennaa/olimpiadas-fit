export default interface Queue {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    setup(exchange: string, queue: string): Promise<void>;
    consume(queue: string, callback: Function): Promise<void>;
    publish(exchange: string, data: any): Promise<void>;
}
