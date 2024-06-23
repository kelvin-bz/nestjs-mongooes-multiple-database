// src/insight/insight.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InsightService } from './insight.service';
import { InsightController } from './insight.controller';
import { Insight, InsightSchema } from './schemas/insight.schema';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { Health, HealthSchema } from './schemas/health.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Insight.name, schema: InsightSchema }],
      'insight',
    ),
    MongooseModule.forFeature(
      [{ name: Patient.name, schema: PatientSchema }],
      'patients',
    ),
    MongooseModule.forFeature(
      [{ name: Health.name, schema: HealthSchema }],
      'health',
    ),
  ],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
