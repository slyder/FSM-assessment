import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { DriveSimulationService } from './drive-sumulation.service';
import { Trip, TripSchema } from './trip.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movement.schema';
import { ConfigModule } from '@nestjs/config';
import { rabbitmqModuleConfigFactory } from '@app/shared/config/rabbitmq.moduleConfig.factory';
import { configModuleConfig } from '@app/shared/config/config.moduleConfig';
import { mongooseModuleConfig } from '@app/shared/config/mongoose.moduleConfig';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    MongooseModule.forRootAsync(mongooseModuleConfig),

    ClientsModule.registerAsync([
      rabbitmqModuleConfigFactory('CAR_MOVE_BUS', 'fms-car-move'),
    ]),

    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema },
      { name: Movement.name, schema: MovementSchema },
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