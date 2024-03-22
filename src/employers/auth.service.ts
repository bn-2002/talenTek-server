import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employer, EmployerDocument } from './schemas/employer.schema';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { LoginUserDto } from 'src/common/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employer.name)
    private employerModel: Model<EmployerDocument>,
  ) {}

  async signupEmployer(employer: CreateEmployerDto) {
    //TODO check duplication in applicants too
    const employerWithDuplicatedEmail = await this.employerModel.findOne({
      email: employer.email,
    });

    if (employerWithDuplicatedEmail) {
      throw new UnauthorizedException(
        'A user has already registered with this email',
      );
    }

    const employerWithDuplicatedPhoneNumber = await this.employerModel.findOne({
      phone_number: employer.phone_number,
    });

    if (employerWithDuplicatedPhoneNumber) {
      throw new UnauthorizedException(
        'A user has already registered with this phone number',
      );
    }

    const hashedPassword = await bcrypt.hash(employer.password, 12);

    const newEmployer = new this.employerModel({
      ...employer,
      password: hashedPassword,
    });

    newEmployer.save();

    return { message: 'Registration was successful ' };
  }

  async loginEmployer(employer: LoginUserDto) {
    const foundEmployer = await this.employerModel.findOne({
      phone_number: employer.phone_number,
    });

    if (
      !foundEmployer ||
      !(await bcrypt.compare(employer.password, foundEmployer.password))
    ) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = sign({ _id: foundEmployer._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { message: 'Login was successful', token };
  }
}
