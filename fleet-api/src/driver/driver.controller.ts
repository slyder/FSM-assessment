import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from './driver.schema';
import { DriverDto } from './driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
  ) {
  }

  @Get()
  getCars(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Get(':driverId')
  getCar(@Param() params): Promise<Driver> {
    const { driverId } = params
    return this.driverService.findById(driverId);
  }

  @Post()
  createCar(@Body() driverData: DriverDto): Promise<Driver> {
    return this.driverService.create(driverData);
  }

  @Put(':driverId')
  updateCar(
    @Param('driverId') driverId: number,
    @Body() driverData: DriverDto,
  ): Promise<Driver> {
    return this.driverService.updateById(driverId, driverData);
  }

  @Delete(':driverId')
  deleteCar(@Param('driverId') driverId: number): Promise<Driver> {
    return this.driverService.deleteById(driverId);
  }

}

