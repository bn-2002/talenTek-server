import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employer, EmployerDocument } from './schemas/employer.schema';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private employerModel: Model<EmployerDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
  ) {}

  async getEmployerById(id: string) {
    const employer = await this.employerModel
      .findById(id)
      .select(['first_name', 'last_name', 'email', 'phone_number']);
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return employer;
  }

  async getEmployers(): Promise<Employer[]> {
    return this.employerModel.find().populate('settings');
  }

  //TODO
  //check if the email or phone number are in used
  async updateEmployer(id: string, body: UpdateEmployerDto) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body is empty');
    }

    const employer = await this.employerModel.findById(id);

    if (!employer) {
      throw new NotFoundException('employer not found');
    }
    await this.employerModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return { message: 'Profile updated successfuly' };
  }

  async deleteEmployer(id: string) {
    const employer = await this.employerModel.findById(id);

    if (!employer) {
      throw new NotFoundException('employer not found');
    }
    await this.employerModel.findByIdAndDelete(id);

    //TODO
    //change the jobs status to not available

    return { message: 'Your account deleted successfuly' };
  }

  async getAllJobs(userId: string) {
    const foundUser = await this.employerModel.findById(userId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    return this.jobModel.find({ employer: userId });
  }

  async getJobById(userId: string, jobId: string) {
    const foundUser = await this.employerModel.findById(userId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    return foundJob;
  }
}
