import { ClientsProviderAsyncOptions, RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitmqTransportConfigFactory = (
  urls: string[],
  queue: string,
): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls,
      queue,
      queueOptions: {
        durable: false
      },
    },
  }
}
