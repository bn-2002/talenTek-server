import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  message: string;

  @IsString()
  jobId: string;
}
