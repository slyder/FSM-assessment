import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trip } from './trip.schema'
import { ClientProxy } from '@nestjs/microservices';
import { Movement } from './movement.schema';

@Injectable()
export class DriveSimulationService {

  private trips: Trip[] = [];
  private carMovements: any = {};

  constructor(
    @InjectModel(Trip.name) private tripModel: Model<Trip>,
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
    @Inject('CAR_MOVE_BUS') private carMoveBus: ClientProxy,
  ) {

  }

  async run() {
    await this.getActualTrips();

    const timerHandle = setInterval(this.runMoveHeartbeat.bind(this), 1500);
    timerHandle.unref();
  }

  async runMoveHeartbeat() {
    for (const trip of this.trips) {
      const movement = this.simulateMovement(trip)
      console.log(`runMoveHeartbeat::movement updated, driverId: ${movement.driverId}, speed: ${movement.speed}`)
      this.carMoveBus.emit<Movement>('car-move', movement);
    }
  }

  simulateMovement(trip: Trip): Movement {
    let movement: Movement = this.carMovements[trip.carId]
    if (!movement) {
      movement = new this.movementModel({
        carId: trip.carId,
        driverId: trip.driverId,
        speed: 0,
        createdAt: new Date(),
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      });

      this.carMovements[trip.carId] = movement
    }

    movement.speed = movement.speed > 80
      ? Math.round(40 + Math.random() * 10 - 5)
      : Math.max(0, Math.round(movement.speed + Math.random() * 20 - 5))
    movement.lat = Math.max(-90, Math.min(90, movement.lat + Math.random() - 0.5))
    movement.lng = Math.max(-180, Math.min(180, movement.lng + Math.random() - 0.5))

    movement.createdAt = new Date()
    return movement
  }

  async getActualTrips() {
    this.trips = await this.tripModel.find().exec();
  }

}
