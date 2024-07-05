import { IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  phone_number: string;

  @IsString()
  password: string;
}
