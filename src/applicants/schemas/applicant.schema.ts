import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Job } from 'src/jobs/schemas/job.schema';

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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  jobs?: Job[];
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
