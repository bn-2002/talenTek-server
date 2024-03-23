import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateJobApplicationDto {
  @IsString()
  status: string;

  @IsString()
  @IsOptional()
  employerMessage?: string;
}
