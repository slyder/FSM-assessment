import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DriveSimulationService } from './drive-sumulation.service';
import { Trip } from './trip.schema';
import { TRIP_CREATED_BUS_MESSAGE } from '@app/shared/busMessages';

@Controller()
export class AppController {
  constructor(
    @Inject(DriveSimulationService) private readonly driveSimulationService: DriveSimulationService,
  ) {
  }

  @EventPattern(TRIP_CREATED_BUS_MESSAGE)
  handleUserCreated(trip: Trip) {
    return this.driveSimulationService.getActualTrips()
  }

}
