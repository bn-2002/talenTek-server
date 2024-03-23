import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './schemas/employer.schema';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JobsService } from 'src/jobs/jobs.service';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
      { name: Job.name, schema: JobSchema },
    ]),
  ],
  controllers: [EmployersController],
  providers: [EmployersService, AuthService, JwtService, JobsService],
})
export class EmployersModule {}
