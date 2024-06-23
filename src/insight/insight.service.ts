// src/insight/insight.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insight, InsightDocument } from './schemas/insight.schema';
import { Health, HealthDocument } from './schemas/health.schema';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class InsightService {
  constructor(
    @InjectModel(Insight.name, 'insight')
    private insightModel: Model<InsightDocument>,

    @InjectModel(Health.name, 'health')
    private healthModel: Model<HealthDocument>,

    @InjectModel(Patient.name, 'patients')
    private patientModel: Model<PatientDocument>,
  ) {}

  async create(
    data: { condition: string; count: number }[],
    type: string,
    date: string,
  ): Promise<Insight> {
    const newInsight = new this.insightModel({ data, type, date });
    return newInsight.save();
  }

  async findAll(): Promise<Insight[]> {
    return this.insightModel.find().exec();
  }

  async generateInsightByAgeLessThan30(): Promise<Insight> {
    // Step 1: Retrieve all patients under the age of 30
    const patientsUnder30 = await this.patientModel
      .find({ age: { $lt: 30 } })
      .exec();

    // Step 2: Retrieve health conditions for patients under 30 and group by condition
    const patientIdsUnder30 = patientsUnder30.map(
      (patient) => patient.patientId,
    );

    const healthAggregation = await this.healthModel
      .aggregate([
        { $match: { patientId: { $in: patientIdsUnder30 } } },
        { $unwind: '$conditions' },
        { $group: { _id: '$conditions', count: { $sum: 1 } } },
        { $project: { _id: 0, condition: '$_id', count: 1 } },
      ])
      .exec();

    // Step 3: Check if an insight for today already exists
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString('en-GB')
      .split('/')
      .reverse()
      .join('-');

    const existingInsight = await this.insightModel
      .findOne({ date: formattedDate })
      .exec();

    if (existingInsight) {
      // Update the existing insight
      existingInsight.data = healthAggregation;
      existingInsight.type = 'Health Conditions for Patients under 30';
      existingInsight.date = formattedDate;
      return existingInsight.save();
    } else {
      // Create a new insight
      const newInsight = new this.insightModel({
        data: healthAggregation,
        type: 'Health Conditions for Patients under 30',
        date: formattedDate,
      });
      return newInsight.save();
    }
  }
}
