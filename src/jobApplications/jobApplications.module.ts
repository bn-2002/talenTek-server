import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobApplication,
  JobApplicationSchema,
} from './schemas/jobApplication.schema';
import { JobApplicationsService } from './jobApplications.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JobApplicationsController } from './jobApplications.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobApplication.name,
        schema: JobApplicationSchema,
      },
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
  ],
  providers: [JobApplicationsService, JwtService],
  controllers: [JobApplicationsController],
})
export class JobApplicationsModule {}
