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
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { LoginUserDto } from 'src/common/dto/login-user.dto';

@Controller('employer')
export class EmployersController {
  constructor(
    private readonly employersService: EmployersService,
    private readonly authSerivce: AuthService,
  ) {}

  @Post('login')
  async loginEmployer(@Body() body: LoginUserDto) {
    return this.authSerivce.loginEmployer(body);
  }

  @Post('signup')
  async signupEmployer(@Body() body: CreateEmployerDto) {
    return this.authSerivce.signupEmployer(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.employersService.getEmployerById(req.userId);
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
