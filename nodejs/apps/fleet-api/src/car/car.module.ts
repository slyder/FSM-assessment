import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car, CarSchema } from './car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
    ])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {
}
