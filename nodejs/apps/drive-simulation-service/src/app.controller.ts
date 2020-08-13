import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DriveSimulationService } from './drive-sumulation.service';
import { Trip } from './trip.schema';

@Controller()
export class AppController {
  constructor(
    @Inject(DriveSimulationService) private readonly driveSimulationService: DriveSimulationService,
  ) {
  }

  @EventPattern('trip-created')
  handleUserCreated(trip: Trip) {
    return this.driveSimulationService.getActualTrips()
  }

}
