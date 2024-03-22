import { CreateJobApplicationDto } from './CreateJobApplicationDto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateJobApplicationDto extends PartialType(
  CreateJobApplicationDto,
) {}
