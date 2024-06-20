// src/insight/insight.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insight, InsightDocument } from './insight.schema';

@Injectable()
export class InsightService {
  constructor(
    @InjectModel(Insight.name, 'insight')
    private insightModel: Model<InsightDocument>,
  ) {}

  async create(data: string): Promise<Insight> {
    const newInsight = new this.insightModel({ data, timestamp: new Date() });
    return newInsight.save();
  }

  async findAll(): Promise<Insight[]> {
    return this.insightModel.find().exec();
  }

  async countPatientsGreater40WithObesity(): Promise<number> {
    return 40
  }
}
