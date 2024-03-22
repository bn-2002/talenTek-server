import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Job } from 'src/jobs/schemas/job.schema';

export type EmployerDocument = HydratedDocument<Employer>;

@Schema()
export class Employer {
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

export const EmployerSchema = SchemaFactory.createForClass(Employer);
