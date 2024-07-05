import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  password: string;

  @Prop()
  phone_number: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
