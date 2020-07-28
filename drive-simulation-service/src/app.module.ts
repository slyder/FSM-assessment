import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DriveSimulationService } from './drive-sumulation.service';
import { Trip, TripSchema } from './trip.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movement.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://fms:pass@mongo:27017/fms'),

    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema },
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
  providers: [AppService, DriveSimulationService],
})
export class AppModule {

  constructor(
    @Inject(DriveSimulationService) private readonly driveSimulationService: DriveSimulationService,
  ) {
    this.driveSimulationService.run();
  }

}
