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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.guard';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/CreateJobDto';
import { UpdateJobDto } from './dto/UpdateJobDto';

@Controller('job')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createJob(@Body() createJobDto: CreateJobDto, @Request() req) {
    return this.jobsService.createJob(createJobDto, req.userId);
  }

  @Patch(':jobId')
  @UseGuards(JwtAuthGuard)
  async updateJob(
    @Body() updateJobDto: UpdateJobDto,
    @Request() req,
    @Param('jobId') jobId: string,
  ) {
    return this.jobsService.updateJob(req.userId, jobId, updateJobDto);
  }

  @Get()
  async getAllJobs(
    @Query('search_term') searchTerm?: string,
    @Query('search_field')
    searchField?: 'job_title' | 'job_description' | 'skill',
  ) {
    return this.jobsService.getAllJobs({
      search_term: searchTerm,
      search_field: searchField,
    });
  }

  @Get(':jobId')
  async getJobById(@Param('jobId') jobId: string) {
    return this.jobsService.getJobById(jobId);
  }
}
