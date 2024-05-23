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
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
import { ApplicantsService } from './applicants.service';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { JobApplicationsService } from 'src/jobApplications/jobApplications.service';

@Controller('applicant')
export class ApplicantsController {
  constructor(
    private readonly applicantsService: ApplicantsService,
    private readonly jobApplicationService: JobApplicationsService,
    private readonly authSerivce: AuthService,
  ) {}

  @Post('login')
  async loginApplicant(@Body() body: LoginUserDto) {
    return this.authSerivce.loginApplicant(body);
  }

  @Post('signup')
  async signupApplicant(@Body() body: CreateApplicantDto) {
    return this.authSerivce.signupApplicant(body);
  }

  @Post('job-application/:jobId')
  @UseGuards(JwtAuthGuard)
  async createJobApplication(@Param('jobId') jobId: string, @Request() req) {
    return this.jobApplicationService.createJobApplication(req.userId, jobId);
  }

  @Get('job-application/status/:jobId')
  @UseGuards(JwtAuthGuard)
  async getJobApplicationStatus(@Param('jobId') jobId: string, @Request() req) {
    return this.applicantsService.getJobApplicationStatus(req.userId, jobId);
  }

  @Get('job-applications')
  @UseGuards(JwtAuthGuard)
  async getJobApplications(@Request() req) {
    return this.applicantsService.getJobApplications(req.userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.applicantsService.getApplicantById(req.userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() body: UpdateApplicantDto, @Request() req) {
    return this.applicantsService.updateApplicant(req.userId, body);
  }
}
