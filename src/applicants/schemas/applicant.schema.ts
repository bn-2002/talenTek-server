import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { JobApplication } from 'src/jobApplications/schemas/jobApplication.schema';

export type ApplicantDocument = HydratedDocument<Applicant>;

@Schema()
export class Applicant {
  @Prop()
  password: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  age: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
    default: [],
  })
  jobApplications?: JobApplication[];
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
