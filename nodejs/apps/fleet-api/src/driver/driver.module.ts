import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver, DriverSchema } from '@app/shared/entities/driver/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
    ])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {
}
