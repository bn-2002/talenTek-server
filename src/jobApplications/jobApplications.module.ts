import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobApplication,
  JobApplicationSchema,
} from './schemas/jobApplication.schema';
import { JobApplicationsService } from './jobApplications.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JobApplicationsController } from './jobApplications.controller';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import {
  Employer,
  EmployerSchema,
} from 'src/employers/schemas/employer.schema';
import {
  Applicant,
  ApplicantSchema,
} from 'src/applicants/schemas/applicant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobApplication.name,
        schema: JobApplicationSchema,
      },
      { name: Job.name, schema: JobSchema },
      { name: Employer.name, schema: EmployerSchema },
      { name: Applicant.name, schema: ApplicantSchema },
    ]),
  ],
  providers: [JobApplicationsService, JwtService],
  controllers: [JobApplicationsController],
})
export class JobApplicationsModule {}
