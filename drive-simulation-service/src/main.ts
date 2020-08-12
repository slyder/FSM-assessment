import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config';
import { rabbitmqTransportConfigFactory } from '../config/rabbitmq.transportConfig.factory';

async function bootstrap() {


  // const appContext = await NestFactory.createApplicationContext(AppModule);
  // const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    rabbitmqTransportConfigFactory(
      // [configService.get('RABBITMQ_URI')],
      [process.env.RABBITMQ_URI],
      'fms-trip-bus'
    )
  );

  app.listen(() => console.log('Driver Simulation started'));
}

bootstrap();
