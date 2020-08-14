import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitmqTransportConfigFactory } from '@app/shared/config/rabbitmq.transportConfig.factory';
import { CAR_MOVE_BUS_MESSAGE } from '@app/shared/busMessages';

async function bootstrap() {

  // WAITING FOR FEATURE: nest does not support ConfigService for Microservices yet
  // awaiting for https://github.com/nestjs/nest/issues/2343 task completion
  // const appContext = await NestFactory.createApplicationContext(AppModule);
  // const configService = appContext.get(ConfigService);
  // const RABBITMQ_URI = configService.get('RABBITMQ_URI')

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    rabbitmqTransportConfigFactory([process.env.RABBITMQ_URI], CAR_MOVE_BUS_MESSAGE)
  );

  app.listen(() => console.log('Driver Penalty service started'));
}

bootstrap();

