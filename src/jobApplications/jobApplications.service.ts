import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Employer,
  EmployerDocument,
} from 'src/employers/schemas/employer.schema';
import { CreateJobApplicationDto } from './dto/CreateJobApplicationDto';
import {
  JobApplication,
  JobApplicationDocument,
} from './schemas/jobApplication.schema';
import { UpdateJobApplicationDto } from './dto/UpdateJobApplicationDto';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectModel(JobApplication.name)
    private jobModel: Model<JobApplicationDocument>,
    @InjectModel(Employer.name) private userModel: Model<EmployerDocument>,
  ) {}

  async createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
    userId: string,
  ) {
    const foundEmployer = await this.userModel.findById(userId);

    if (!foundEmployer) {
      throw new NotFoundException('Employer not found');
    }

    const data = {
      ...createJobApplicationDto,
      employer: foundEmployer._id,
    };

    const newJob = new this.jobModel(data);

    newJob.save();

    await foundEmployer.updateOne({
      $push: {
        jobs: newJob._id,
      },
    });

    return {
      message: 'Job Application created succuessfully',
    };
  }

  async updateJobApplication(
    employerId: string,
    jobId: string,
    body: UpdateJobApplicationDto,
  ) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body is empty');
    }

    const foundUser = await this.userModel.findById(employerId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    await this.jobModel.findByIdAndUpdate(jobId, body, {
      new: true,
    });

    return {
      message: 'Job updated succuessfully',
    };
  }

  async getAllJobApplcations(userId: string) {
    const foundUser = await this.userModel.findById(userId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    return this.jobModel.find({ employer: userId });
  }

  async getJobApplicationById(userId: string, jobApplicationId: string) {
    const foundUser = await this.userModel.findById(userId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    const foundJobApplication = await this.jobModel.findById(jobApplicationId);

    if (!foundJobApplication) {
      throw new NotFoundException('Job Application not found');
    }

    return foundJobApplication;
  }
}
