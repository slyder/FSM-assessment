import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'fms-car-move',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen(() => console.log('Driver Penalty Matching started'));
}
bootstrap();

