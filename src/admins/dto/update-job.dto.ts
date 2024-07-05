import { IsBoolean } from 'class-validator';

export class updateJobDto {
  @IsBoolean()
  approved: boolean;
}
