import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { EmploymentStatustType, JobArrangementType } from '../../common/types';
import { IsPositive } from '@nestjs/class-validator';

type JobApplicationStatus = 'pending' | 'rejected' | 'accepted';

export class CreateJobApplicationDto {
  @IsString()
  @IsOptional()
  applicantMessage?: string;
}
