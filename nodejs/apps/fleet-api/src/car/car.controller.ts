import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.schema';
import { CarDto } from './car.dto';
import { ConfigService } from '@nestjs/config';

@Controller("cars")
export class CarController {

  constructor(
    private readonly carService: CarService,
    private configService: ConfigService
  ) {
  }

  @Get()
  getCars(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(":carId")
  getCar(@Param() params): Promise<Car> {
    const { carId } = params;
    return this.carService.findById(carId);
  }

  @Post()
  createCar(@Body() carData: CarDto): Promise<Car> {
    return this.carService.create(carData);
  }

  @Put(":carId")
  updateCar(
    @Param("carId") carId: number,
    @Body() carData: CarDto
  ): Promise<Car> {
    return this.carService.updateById(carId, carData);
  }

  @Delete(":carId")
  deleteCar(@Param("carId") carId: number): Promise<Car> {
    return this.carService.deleteById(carId);
  }

}
