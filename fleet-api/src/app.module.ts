import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { DriverModule } from './driver/driver.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://fms:pass@mongo:27017/fms'),

    CarModule,
    DriverModule,
    TripModule,
  ],
})
export class AppModule {
}
