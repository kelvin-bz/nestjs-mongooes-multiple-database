import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name, 'patients')
    private patientModel: Model<Patient>,
  ) {}

  async countPatientsOver40(patientIdsWithObesity: string[]): Promise<number> {
    return this.patientModel
      .countDocuments({
        patientId: { $in: patientIdsWithObesity },
        age: { $gt: 40 },
      })
      .exec();
  }
}
