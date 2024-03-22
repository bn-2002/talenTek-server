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
  async createJob(
    @Body() createJobDto: CreateJobApplicationDto,
    @Request() req,
  ) {
    return this.jobsService.createJobApplication(createJobDto, req.userId);
  }

  @Patch(':jobId')
  @UseGuards(JwtAuthGuard)
  async updateJob(
    @Body() updateJobDto: UpdateJobApplicationDto,
    @Request() req,
    @Param('jobId') jobId: string,
  ) {
    return this.jobsService.updateJobApplication(
      req.userId,
      jobId,
      updateJobDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllJobs(@Request() req) {
    return this.jobsService.getAllJobApplcations(req.userId);
  }

  @Get(':jobId')
  @UseGuards(JwtAuthGuard)
  async getJobById(@Request() req, @Param('jobId') jobId: string) {
    return this.jobsService.getJobApplicationById(req.userId, jobId);
  }
}
