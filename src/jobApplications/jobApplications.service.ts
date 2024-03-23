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

    const newJobApplication = new this.jobModel(data);

    newJobApplication.save();

    await foundEmployer.updateOne({
      $push: {
        jobs: newJobApplication._id,
      },
    });

    return {
      message: 'Job Application created succuessfully',
    };
  }
}
