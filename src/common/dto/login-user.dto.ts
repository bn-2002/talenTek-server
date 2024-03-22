import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  phone_number: string;

  @IsString()
  password: string;
}
