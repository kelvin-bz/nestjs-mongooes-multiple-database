import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Health } from './health.schema'; // Assuming you move the schemas

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(Health.name, 'health')
    private healthModel: Model<Health>,
  ) {}

  async findPatientsWithCondition(condition: string): Promise<Health[]> {
    return this.healthModel.find({ condition }).exec();
  }
}
