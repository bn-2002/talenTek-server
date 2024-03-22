import { CreateJobDto } from './CreateJobDto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateJobDto extends PartialType(CreateJobDto) {}
