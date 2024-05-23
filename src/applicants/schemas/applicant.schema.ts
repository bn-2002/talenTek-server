import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop()
  skills?: string[];

  @Prop()
  educational_background?: string[];

  @Prop()
  work_experiences?: string[];
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
