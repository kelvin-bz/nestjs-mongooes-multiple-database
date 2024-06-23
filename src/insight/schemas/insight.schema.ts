// src/insight/schemas/insight.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InsightDocument = HydratedDocument<Insight>;

@Schema()
export class Insight {
  @Prop({ type: [{ condition: String, count: Number }] })
  data: { condition: string; count: number }[];

  @Prop()
  type: string;

  @Prop()
  date: string;
}

export const InsightSchema = SchemaFactory.createForClass(Insight);
