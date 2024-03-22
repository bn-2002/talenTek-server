import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employer, EmployerDocument } from './schemas/employer.schema';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private EmployerModel: Model<EmployerDocument>,
  ) {}

  async getEmployerById(id: string) {
    const employer = await this.EmployerModel.findById(id).select([
      'first_name',
      'last_name',
      'email',
      'phone_number',
    ]);
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return employer;
  }

  async getEmployers(): Promise<Employer[]> {
    return this.EmployerModel.find().populate('settings');
  }

  //TODO
  //check if the email or phone number are in used
  async updateEmployer(id: string, body: UpdateEmployerDto) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body is empty');
    }

    const employer = await this.EmployerModel.findById(id);

    if (!employer) {
      throw new NotFoundException('employer not found');
    }
    await this.EmployerModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return { message: 'Profile updated successfuly' };
  }

  async deleteEmployer(id: string) {
    const employer = await this.EmployerModel.findById(id);

    if (!employer) {
      throw new NotFoundException('employer not found');
    }
    await this.EmployerModel.findByIdAndDelete(id);

    //TODO
    //change the jobs status to not available

    return { message: 'Your account deleted successfuly' };
  }
}
