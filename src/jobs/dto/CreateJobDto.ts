import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { EmploymentStatustType, JobArrangementType } from '../../common/types';
import { IsPositive } from '@nestjs/class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  arrangement_type: JobArrangementType;

  @IsString()
  employment_status_type: EmploymentStatustType;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsPositive()
  salary?: number;

  @IsPositive()
  month_of_experiences?: number;

  @IsString({ each: true })
  required_skills: string[];

  @IsOptional()
  @IsString({ each: true })
  preferred_skills?: string[];

  @IsOptional()
  @IsString()
  education_requirements?: string;

  @IsOptional()
  @IsString()
  benefits?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsString()
  company_size?: string;

  @IsOptional()
  @IsString()
  company_website?: string;

  @IsOptional()
  @IsBoolean()
  expired?: boolean;
}
