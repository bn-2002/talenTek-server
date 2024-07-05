import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { updateJobDto } from './dto/update-job.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    @InjectModel(Job.name)
    private jobModel: Model<JobDocument>,
  ) {}

  async getAllJobs(userId: string) {
    const foundAdmin = await this.adminModel.findById(userId);

    if (!foundAdmin) {
      throw new NotFoundException('Admin not found');
    }

    return this.jobModel.find();
  }

  async getJobById(jobId: string, userId: string) {
    const foundAdmin = await this.adminModel.findById(userId);

    if (!foundAdmin) {
      throw new NotFoundException('Admin not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    return foundJob;
  }

  async changeJobStatus(jobId: string, body: updateJobDto, userId: string) {
    const foundAdmin = await this.adminModel.findById(userId);

    if (!foundAdmin) {
      throw new NotFoundException('Admin not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    await this.jobModel.findByIdAndUpdate(jobId, body, {
      new: true,
    });

    return {
      message: 'Job Status Changed succuessfully',
    };
  }
}
