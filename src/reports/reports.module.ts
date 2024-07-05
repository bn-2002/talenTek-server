import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from 'src/jwt/jwt.service';
import { ReportsController } from './reports.controller';
import { Report, ReportSchema } from './schemas/report.schema';
import { ReportsService } from './reports.service';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import { JobsService } from 'src/jobs/jobs.service';
import {
  Employer,
  EmployerSchema,
} from 'src/employers/schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Report.name,
        schema: ReportSchema,
      },
      { name: Job.name, schema: JobSchema },
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  providers: [ReportsService, JwtService, JobsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
