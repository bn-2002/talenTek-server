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
import { LoginUserDto } from 'src/common/dto/login-user.dto';
import { Applicant, ApplicantDocument } from './schemas/applicant.schema';
import { CreateApplicantDto } from './dto/create-applicant.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Applicant.name)
    private applicantModel: Model<ApplicantDocument>,
  ) {}

  async signupApplicant(applicant: CreateApplicantDto) {
    //TODO check duplication in employers too
    const applicantWithDuplicatedEmail = await this.applicantModel.findOne({
      email: applicant.email,
    });

    if (applicantWithDuplicatedEmail) {
      throw new UnauthorizedException(
        'A user has already registered with this email',
      );
    }

    const applicantWithDuplicatedPhoneNumber =
      await this.applicantModel.findOne({
        phone_number: applicant.phone_number,
      });

    if (applicantWithDuplicatedPhoneNumber) {
      throw new UnauthorizedException(
        'A user has already registered with this phone number',
      );
    }

    const hashedPassword = await bcrypt.hash(applicant.password, 12);

    const newApplicant = new this.applicantModel({
      ...applicant,
      password: hashedPassword,
    });

    newApplicant.save();

    return { message: 'Registration was successful ' };
  }

  async loginApplicant(applicant: LoginUserDto) {
    const foundApplicant = await this.applicantModel.findOne({
      phone_number: applicant.phone_number,
    });

    if (
      !foundApplicant ||
      !(await bcrypt.compare(applicant.password, foundApplicant.password))
    ) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = sign({ _id: foundApplicant._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { message: 'Login was successful', token };
  }
}
