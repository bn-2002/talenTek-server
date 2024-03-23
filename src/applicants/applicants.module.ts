import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { Applicant, ApplicantSchema } from './schemas/applicant.schema';
import {
  JobApplication,
  JobApplicationSchema,
} from 'src/jobApplications/schemas/jobApplication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
  ],
  controllers: [ApplicantsController],
  providers: [ApplicantsService, AuthService, JwtService],
})
export class ApplicantsModule {}
