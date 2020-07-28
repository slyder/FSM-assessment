import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Movement } from './movement.schema';
import { DriverService } from './driver/driver.service';

@Controller()
export class AppController {

  constructor(
    private readonly driverService: DriverService,
  ) {
  }

  @EventPattern('car-move')
  async handleCarMovement(movement: Movement) {
    if (movement.speed > 60) {
      const points = movement.speed > 80 ? 5 : 2
      console.log(`penalty for driver ${movement.driverId} with ${points} points`)

      this.driverService.incrementPenaltyPoints(movement.driverId, points)
    }
  }

}
