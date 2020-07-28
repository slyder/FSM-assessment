import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trip } from './trip.schema';
import { TripDto } from './trip.dto';

@Injectable()
export class TripService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {
  }

  async findAll(): Promise<Trip[]> {
    return this.tripModel.find().exec();
  }

  async findById(tripId: number): Promise<Trip> {
    return this.tripModel.findById(tripId).exec();
  }

  async create(tripData: TripDto): Promise<Trip> {
    const carWithDriver = await this.tripModel.findOne({
      driverId: tripData.driverId,
    })
    if (carWithDriver) throw new HttpException('Driver already in active trip.', HttpStatus.METHOD_NOT_ALLOWED)

    const trip = new this.tripModel(tripData);
    return trip.save();
  }

  async updateById(tripId: number, tripData: TripDto): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate({ _id: tripId }, tripData, { new: true })
      .exec();
  }

  async deleteById(tripId: number): Promise<Trip> {
    return this.tripModel.findOneAndDelete({ _id: tripId }).exec();
  }

}
