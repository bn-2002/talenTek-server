import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantDto } from './create-applicant.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateApplicant {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  password: string;

  @IsString({ each: true })
  skills: string[];

  @IsString({ each: true })
  educational_background: string[];

  @IsString({ each: true })
  work_experiences: string[];
}

export class UpdateApplicantDto extends PartialType(UpdateApplicant) {}
