import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientService } from './patient.service';
import { Patient, PatientSchema } from './patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Patient.name, schema: PatientSchema }],
      'patients',
    ),
  ],
  controllers: [],
  providers: [PatientService],
})
export class PatientModule {}
