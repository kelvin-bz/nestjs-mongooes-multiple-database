// src/insight/insight.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { InsightService } from './insight.service';

@Controller('insight')
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Get('health-conditions-under-30')
  async countPatientsUnder40WithDiabetes() {
    return this.insightService.generateInsightByAgeLessThan30();
  }
}
