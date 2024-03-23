import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JobsService } from 'src/jobs/jobs.service';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import { JobApplicationsService } from 'src/jobApplications/jobApplications.service';
import {
  JobApplication,
  JobApplicationSchema,
} from 'src/jobApplications/schemas/jobApplication.schema';
import {
  Applicant,
  ApplicantSchema,
} from 'src/applicants/schemas/applicant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
      { name: Job.name, schema: JobSchema },
      { name: Applicant.name, schema: ApplicantSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
  ],
  controllers: [EmployersController],
  providers: [
    EmployersService,
    AuthService,
    JwtService,
    JobsService,
    JobApplicationsService,
  ],
})
export class EmployersModule {}
