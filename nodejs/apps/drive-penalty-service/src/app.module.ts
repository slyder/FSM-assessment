import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movement.schema';
import { Driver, DriverSchema } from '@app/shared/entities/driver/driver.schema';
import { DriverService } from './driver/driver.service';
import { mongooseModuleConfig } from '@app/shared/config/mongoose.moduleConfig';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongooseModuleConfig),

    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
      { name: Movement.name, schema: MovementSchema },
    ]),

  ],
  controllers: [AppController],
  providers: [DriverService],
})
export class AppModule {
}
