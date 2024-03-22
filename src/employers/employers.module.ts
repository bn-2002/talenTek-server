import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  controllers: [EmployersController],
  providers: [EmployersService, AuthService, JwtService],
})
export class EmployersModule {}
