import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Applicant } from 'src/applicants/schemas/applicant.schema';
import { Employer } from 'src/employers/schemas/employer.schema';
import { Job } from 'src/jobs/schemas/job.schema';

export type JobApplicationDocument = JobApplication & mongoose.Document;

@Schema()
export class JobApplication {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employer' })
  employer: Employer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' })
  applicant: Applicant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
  job: Job;

  @Prop({ default: 'pending' })
  status?: string;

  @Prop()
  applicantMessage?: string;

  @Prop()
  employerReply?: string;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  //   default: [],
  // })
  // messages?: Message[];
}

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
