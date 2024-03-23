import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.guard';
import { AuthService } from './auth.service';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
import { CreateJobDto } from 'src/jobs/dto/CreateJobDto';
import { JobsService } from 'src/jobs/jobs.service';

@Controller('employer')
export class EmployersController {
  constructor(
    private readonly employersService: EmployersService,
    private readonly authSerivce: AuthService,
    private readonly jobsService: JobsService,
  ) {}

  @Post('login')
  async loginEmployer(@Body() body: LoginUserDto) {
    return this.authSerivce.loginEmployer(body);
  }

  @Post('signup')
  async signupEmployer(@Body() body: CreateEmployerDto) {
    return this.authSerivce.signupEmployer(body);
  }

  @Post('job')
  @UseGuards(JwtAuthGuard)
  async createJob(@Body() createJobDto: CreateJobDto, @Request() req) {
    return this.jobsService.createJob(createJobDto, req.userId);
  }

  @Get('job')
  @UseGuards(JwtAuthGuard)
  async getAllJobs(@Request() req) {
    return this.employersService.getAllJobs(req.userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.employersService.getEmployerById(req.userId);
  }

  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard)
  async getJobById(@Request() req, @Param('jobId') jobId: string) {
    return this.employersService.getJobById(req.userId, jobId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() body: UpdateEmployerDto, @Request() req) {
    return this.employersService.updateEmployer(req.userId, body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteEmployer(@Request() req) {
    return this.employersService.deleteEmployer(req.userId);
  }
}
