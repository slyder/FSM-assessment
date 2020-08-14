import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './car.schema';
import { CarDto } from './car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async findById(carId: number): Promise<Car> {
    return this.carModel.findById(carId).exec();
  }

  async create(carData: CarDto): Promise<Car> {
    const car = new this.carModel(carData);
    return car.save();
  }

  async updateById(carId: number, carData: CarDto): Promise<Car> {
    return this.carModel
      .findOneAndUpdate({ _id: carId }, carData, { new: true })
      .exec();
  }

  async deleteById(carId: number): Promise<Car> {
    return this.carModel.findOneAndDelete({ _id: carId }).exec();
  }

}
