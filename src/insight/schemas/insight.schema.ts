// src/insight/schemas/insight.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InsightDocument = HydratedDocument<Insight>;

@Schema()
export class Insight {
  @Prop()
  data: string;

  @Prop()
  timestamp: Date;
}

export const InsightSchema = SchemaFactory.createForClass(Insight);
