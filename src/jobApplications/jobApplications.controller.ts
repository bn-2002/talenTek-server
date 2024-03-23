import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.guard';
import { JobApplicationsService } from './jobApplications.service';
import { CreateJobApplicationDto } from './dto/CreateJobApplicationDto';
import { UpdateJobApplicationDto } from './dto/UpdateJobApplicationDto';

@Controller('job-application')
export class JobApplicationsController {
  constructor(private jobsService: JobApplicationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createJobApplication(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
    @Request() req,
  ) {
    return this.jobsService.createJobApplication(
      createJobApplicationDto,
      req.userId,
    );
  }
}
