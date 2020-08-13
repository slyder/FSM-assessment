import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { DriverModule } from './driver/driver.module';
import { TripModule } from './trip/trip.module';
import { configModuleConfig } from '@app/shared/config/config.moduleConfig';
import { mongooseModuleConfig } from '@app/shared/config/mongoose.moduleConfig';

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
