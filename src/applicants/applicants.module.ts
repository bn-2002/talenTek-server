import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { Applicant, ApplicantSchema } from './schemas/applicant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema },
    ]),
  ],
  controllers: [ApplicantsController],
  providers: [ApplicantsService, AuthService, JwtService],
})
export class ApplicantsModule {}
