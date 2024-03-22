import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employer } from 'src/employers/schemas/employer.schema';

export type JobDocument = Job & mongoose.Document;

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  arrangement_type: string;

  @Prop()
  employment_status_type: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  salary?: number;

  @Prop()
  month_of_experiences?: number;

  @Prop()
  required_skills: string[];

  @Prop()
  preferred_skills?: string[];

  @Prop()
  education_requirements?: string;

  @Prop()
  benefits?: string;

  @Prop()
  company_name?: string;

  @Prop()
  company_size?: string;

  @Prop()
  company_website?: string;

  //TODO change it to false
  @Prop({ default: true })
  approved?: boolean;

  @Prop({ default: false })
  expired?: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employer' })
  employer: Employer;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
  //   default: [],
  // })
  // JobApplications?: JobApplication[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
