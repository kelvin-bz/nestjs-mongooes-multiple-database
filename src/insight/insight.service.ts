// src/insight/insight.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insight, InsightDocument } from './schemas/insight.schema';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { Health, HealthDocument } from './schemas/health.schema';

@Injectable()
export class InsightService {
  constructor(
    @InjectModel(Insight.name, 'insight')
    private insightModel: Model<InsightDocument>,

    @InjectModel(Patient.name, 'patients')
    private patientModel: Model<PatientDocument>,

    @InjectModel(Health.name, 'health')
    private healthModel: Model<HealthDocument>,
  ) {}

  async create(data: string): Promise<Insight> {
    const newInsight = new this.insightModel({ data, timestamp: new Date() });
    return newInsight.save();
  }

  async findAll(): Promise<Insight[]> {
    return this.insightModel.find().exec();
  }

  async countPatientsGreater40WithObesity(): Promise<number> {
    const patientsWithDiabetes = await this.healthModel
      .find({ condition: 'Obesity' })
      .exec();
    const patientIdsWithDiabetes = patientsWithDiabetes.map(
      (patient) => patient.patientId,
    );

    const count = await this.patientModel
      .countDocuments({
        patientId: { $in: patientIdsWithDiabetes },
        age: { $gt: 40 },
      })
      .exec();


    return count;
  }
}
