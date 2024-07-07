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

  //FIXME
  async getAllJobs(query: {
    search_term?: string;
    search_field?: 'job_title' | 'job_description' | 'skill';
  }) {
    const { search_term, search_field } = query;
    const filter: any = { approved: true };

    if (search_term && search_field) {
      filter[search_field] = { $regex: new RegExp(search_term, 'i') }; // Case-insensitive search
    }

    // If no search criteria provided, return all jobs
    const jobs = await this.jobModel.find(filter).exec();
    return jobs;
  }

  async getJobById(jobId: string) {
    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    return foundJob;
  }
}
