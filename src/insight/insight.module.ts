// src/insight/insight.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InsightService } from './insight.service';
import { InsightController } from './insight.controller';
import { Insight, InsightSchema } from './insight.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Insight.name, schema: InsightSchema }],
      'insight',
    ),
  ],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
