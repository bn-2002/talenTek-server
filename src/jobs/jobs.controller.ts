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
  @UseGuards(JwtAuthGuard)
  async getAllJobs(@Request() req) {
    return this.jobsService.getAllJobs(req.userId);
  }

  @Get(':jobId')
  @UseGuards(JwtAuthGuard)
  async getJobById(@Request() req, @Param('jobId') jobId: string) {
    return this.jobsService.getJobById(req.userId, jobId);
  }

  @Delete(':jobId')
  @UseGuards(JwtAuthGuard)
  async deleteJob(@Request() req, @Param('jobId') jobId: string) {
    return this.jobsService.deleteJob(req.userId, jobId);
  }
}
