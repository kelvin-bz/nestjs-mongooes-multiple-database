// src/health/schemas/health.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HealthDocument = HydratedDocument<Health>;

@Schema()
export class Health {
  @Prop()
  patientId: string;

  @Prop()
  conditions: string[];
}

export const HealthSchema = SchemaFactory.createForClass(Health);
