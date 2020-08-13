import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movement extends Document {
  @Prop()
  carId: string;

  @Prop()
  driverId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  speed: number;

  @Prop()
  lat: number;

  @Prop()
  lng: number;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);