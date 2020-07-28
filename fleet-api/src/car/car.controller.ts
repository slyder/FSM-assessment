import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.schema';
import { CarDto } from './car.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('cars')
export class CarController {

  constructor(
    private readonly carService: CarService,
  ) {
  }

  @Get()
  getCars(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(':carId')
  getCar(@Param() params): Promise<Car> {
    const { carId } = params
    return this.carService.findById(carId);
  }

  @Post()
  createCar(@Body() carData: CarDto): Promise<Car> {
    return this.carService.create(carData);
  }

  @Put(':carId')
  updateCar(
    @Param('carId') carId: number,
    @Body() carData: CarDto,
  ): Promise<Car> {
    return this.carService.updateById(carId, carData);
  }

  @Delete(':carId')
  deleteCar(@Param('carId') carId: number): Promise<Car> {
    return this.carService.deleteById(carId);
  }

}
