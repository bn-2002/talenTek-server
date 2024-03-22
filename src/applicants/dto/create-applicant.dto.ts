import { IsEmail, IsString } from 'class-validator';

export class CreateApplicantDto {
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
}
