import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Driver extends Document {
  @Prop()
  name: string;

  @Prop()
  drivingCarId: number;

  @Prop()
  penaltyPoints: number = 0;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
