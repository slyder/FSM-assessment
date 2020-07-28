import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movement.schema';
import { Driver, DriverSchema } from './driver/driver.schema';
import { DriverService } from './driver/driver.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://fms:pass@mongo:27017/fms'),

    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
      { name: Movement.name, schema: MovementSchema },
    ]),

    ClientsModule.register([
      {
        name: 'CAR_MOVE_BUS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'fms-car-move',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [DriverService],
})
export class AppModule {
}
