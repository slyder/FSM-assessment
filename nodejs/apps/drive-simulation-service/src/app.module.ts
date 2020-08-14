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
import { CAR_MOVE_BUS_MESSAGE } from '@app/shared/busMessages';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),

    ClientsModule.registerAsync([
      rabbitmqModuleConfigFactory('CAR_MOVE_BUS', CAR_MOVE_BUS_MESSAGE),
    ]),

    MongooseModule.forRootAsync(mongooseModuleConfig),
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
