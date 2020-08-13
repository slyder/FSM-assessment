import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { TripService } from './trip.service';
import { Trip } from './trip.schema';
import { TripDto } from './trip.dto';
import { ClientProxy } from '@nestjs/microservices';

// import { CAR_DRIVER_CHANGED } from "../../../shared/messages";

@Controller('trips')
export class TripController {
  constructor(
    @Inject('TRIP_BUS') private tripBus: ClientProxy,
    private readonly tripService: TripService,
  ) {
  }

  @Get()
  getTrips(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(':tripId')
  getTrip(@Param() params): Promise<Trip> {
    const { tripId } = params

    this.tripBus.emit<number>('trip-created', tripId);
    console.log('emit', 'trip-created', tripId);

    return this.tripService.findById(tripId);
  }

  @Post()
  async createTrip(@Body() tripData: TripDto): Promise<Trip> {
    const trip = await this.tripService.create(tripData);

    this.tripBus.emit<number>('trip-created', trip.id);
    console.log('emit', 'trip-created', trip.id);

    return trip
  }

  @Put(':tripId')
  updateTrip(
    @Param('tripId') tripId: number,
    @Body() tripData: TripDto,
  ): Promise<Trip> {
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    // return this.tripService.updateById(tripId, tripData);
  }

  @Delete(':tripId')
  deleteTrip(@Param('tripId') tripId: number): Promise<Trip> {
    return this.tripService.deleteById(tripId);
  }

}
