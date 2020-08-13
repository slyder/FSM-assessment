import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trip extends Document {
  @Prop()
  id: string;

  @Prop()
  carId: string;

  @Prop()
  driverId: string;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);