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
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
  ) {}

  async signupAdmin(admin: CreateAdminDto) {
    //TODO check duplication in employers too
    const adminWithDuplicatedPhoneNumber = await this.adminModel.findOne({
      email: admin.phone_number,
    });

    if (adminWithDuplicatedPhoneNumber) {
      throw new UnauthorizedException(
        'A user has already registered with this email',
      );
    }

    const applicantWithDuplicatedPhoneNumber = await this.adminModel.findOne({
      phone_number: admin.phone_number,
    });

    if (applicantWithDuplicatedPhoneNumber) {
      throw new UnauthorizedException(
        'A user has already registered with this phone number',
      );
    }

    const hashedPassword = await bcrypt.hash(admin.password, 12);

    const newApplicant = new this.adminModel({
      ...admin,
      password: hashedPassword,
    });

    newApplicant.save();

    return { message: 'Registration was successful ' };
  }

  async loginAdmin(admin: LoginUserDto) {
    const foundAdmin = await this.adminModel.findOne({
      phone_number: admin.phone_number,
    });

    if (
      !foundAdmin ||
      !(await bcrypt.compare(admin.password, foundAdmin.password))
    ) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = sign({ _id: foundAdmin._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { message: 'Login was successful', token };
  }
}
