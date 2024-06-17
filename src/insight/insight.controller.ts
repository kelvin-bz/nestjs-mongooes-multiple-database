// src/insight/insight.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { InsightService } from './insight.service';

@Controller('insight')
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Post()
  async create(@Body('data') data: string) {
    return this.insightService.create(data);
  }

  @Get()
  async findAll() {
    return this.insightService.findAll();
  }

  @Get('count-obesity-greater-40')
  async countPatientsUnder40WithDiabetes(): Promise<number> {
    return this.insightService.countPatientsGreater40WithObesity();
  }
}
