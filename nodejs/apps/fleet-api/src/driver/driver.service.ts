import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './driver.schema';
import { DriverDto } from "./driver.dto";

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {
  }

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }

  async findById(driverId: number): Promise<Driver> {
    return this.driverModel.findById(driverId).exec();
  }

  async create(carData: DriverDto): Promise<Driver> {
    const car = new this.driverModel(carData);
    return car.save();
  }

  async updateById(carId: number, carData: DriverDto): Promise<Driver> {
    return this.driverModel
      .findOneAndUpdate({ _id: carId }, carData, { new: true })
      .exec();
  }

  async deleteById(carId: number): Promise<Driver> {
    return this.driverModel.findOneAndDelete({ _id: carId }).exec();
  }

}
