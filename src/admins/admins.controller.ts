import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.guard';
import { AuthService } from './auth.service';
import { JobApplicationsService } from 'src/jobApplications/jobApplications.service';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminsService } from './admins.service';
import { JobsService } from 'src/jobs/jobs.service';
import { updateJobDto } from './dto/update-job.dto';

@Controller('admin')
export class AdminsController {
  constructor(
    private readonly authSerivce: AuthService,
    private readonly adminsService: AdminsService,
  ) {}

  @Post('login')
  async loginAdmin(@Body() body: LoginUserDto) {
    return this.authSerivce.loginAdmin(body);
  }

  @Post('signup')
  async signupAdmin(@Body() body: CreateAdminDto) {
    return this.authSerivce.signupAdmin(body);
  }

  @Get('job')
  @UseGuards(JwtAuthGuard)
  async getJobs(@Request() req) {
    return this.adminsService.getAllJobs(req.userId);
  }

  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard)
  async getJobById(@Param('jobId') jobId: string, @Request() req) {
    return this.adminsService.getJobById(jobId, req.userId);
  }

  @Patch('job/:jobId')
  @UseGuards(JwtAuthGuard)
  async updateJobStatus(
    @Param('jobId') jobId: string,
    @Body() body: updateJobDto,
    @Request() req,
  ) {
    console.log('body=>', body);
    return this.adminsService.changeJobStatus(jobId, body, req.userId);
  }
}
