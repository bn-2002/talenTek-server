import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import {
  Employer,
  EmployerSchema,
} from 'src/employers/schemas/employer.schema';
import { AdminsController } from './admins.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { AdminsService } from './admins.service';
import { JobsService } from 'src/jobs/jobs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Job.name, schema: JobSchema },
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AuthService, JwtService, JobsService],
})
export class AdminsModule {}
