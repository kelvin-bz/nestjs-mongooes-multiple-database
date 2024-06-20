import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthService } from './health.service';
import { Health, HealthSchema } from './health.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Health.name, schema: HealthSchema }],
      'health',
    ),
  ],
  providers: [HealthService],
})
export class HealthModule {}
