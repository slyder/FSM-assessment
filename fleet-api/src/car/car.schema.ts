import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Car extends Document {
  @Prop()
  name: string;

  @Prop()
  buildYear: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
