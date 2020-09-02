import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAT_BUS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'fms-cat-bus',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],

  controllers: [CatController],
})
export class CatModule {
}
