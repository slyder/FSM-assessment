import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { Trip, TripSchema } from './trip.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema },
    ]),

    ClientsModule.register([
      {
        name: 'TRIP_BUS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'fms-trip-bus',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],

  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {
}
