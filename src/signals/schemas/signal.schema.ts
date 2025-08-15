import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Signal extends Document {
  @Prop({ required: true, index: true })
  deviceId: string;

  @Prop({ required: true, index: true })
  time: number;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop()
  maxSpeed?: number;

  @Prop()
  avgSpeed?: number;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);

SignalSchema.index({ deviceId: 1, time: 1 }, { unique: true });
