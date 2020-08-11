import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { DriverModule } from './driver/driver.module';
import { TripModule } from './trip/trip.module';
import { mongooseModuleConfig } from "../config/mongoose.moduleConfig";
import { configModuleConfig } from "../config/config.moduleConfig";

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    MongooseModule.forRootAsync(mongooseModuleConfig),

    CarModule,
    DriverModule,
    TripModule,
  ],
})
export class AppModule {
}

