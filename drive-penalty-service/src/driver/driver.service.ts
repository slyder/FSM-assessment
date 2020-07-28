import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './driver.schema';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {
  }

  async incrementPenaltyPoints(driverId: string, penaltyPoints: number): Promise<Driver> {
    return this.driverModel
      .findOneAndUpdate({ _id: driverId }, { $inc: { penaltyPoints } })
      .exec();
  }

}