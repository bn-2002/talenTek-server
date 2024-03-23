import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('applicant')
export class ApplicantsController {
  constructor(
    private readonly applicantsService: ApplicantsService,
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
