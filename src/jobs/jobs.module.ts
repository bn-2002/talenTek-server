import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { JobsService } from './jobs.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JobsController } from './jobs.controller';
import {
  Employer,
  EmployerSchema,
} from 'src/employers/schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Job.name,
        schema: JobSchema,
      },
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  providers: [JobsService, JwtService],
  controllers: [JobsController],
})
export class JobsModule {}
