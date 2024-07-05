import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Applicant } from 'src/applicants/schemas/applicant.schema';
import { Job } from 'src/jobs/schemas/job.schema';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
  job?: Job;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' })
  applicant?: Applicant;

  @Prop()
  message: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
