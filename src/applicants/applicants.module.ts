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
import { JobApplicationsService } from 'src/jobApplications/jobApplications.service';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import {
  Employer,
  EmployerSchema,
} from 'src/employers/schemas/employer.schema';
import { EmployersService } from 'src/employers/employers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
      { name: Job.name, schema: JobSchema },
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  controllers: [ApplicantsController],
  providers: [
    ApplicantsService,
    AuthService,
    JwtService,
    JobApplicationsService,
    EmployersService,
  ],
})
export class ApplicantsModule {}
