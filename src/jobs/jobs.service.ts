import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import {
  Employer,
  EmployerDocument,
} from 'src/employers/schemas/employer.schema';
import { CreateJobDto } from './dto/CreateJobDto';
import { UpdateJobDto } from './dto/UpdateJobDto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(Employer.name) private userModel: Model<EmployerDocument>,
  ) {}

  async createJob(createJobDto: CreateJobDto, userId: string) {
    //TODO
    //check if title and subject are duplicated

    const foundEmployer = await this.userModel.findById(userId);

    if (!foundEmployer) {
      throw new NotFoundException('Employer not found');
    }

    const data = {
      ...createJobDto,
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
      message: 'Job created succuessfully',
    };
  }

  async updateJob(employerId: string, jobId: string, body: UpdateJobDto) {
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

  async getAllJobs(userId: string) {
    const foundUser = await this.userModel.findById(userId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    return this.jobModel.find({ employer: userId });
  }

  async getJobById(userId: string, jobId: string) {
    const foundUser = await this.userModel.findById(userId);

    if (!foundUser) {
      throw new NotFoundException('Employer not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    return foundJob;
  }

  async deleteJob(userId: string, jobId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const job = await this.jobModel.findById(jobId);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    await this.jobModel.deleteOne({ _id: jobId });

    return { message: 'Job deleted successfuly' };
  }
}
