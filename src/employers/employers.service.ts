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
import {
  JobApplication,
  JobApplicationDocument,
} from 'src/jobApplications/schemas/jobApplication.schema';
import { UpdateJobApplicationDto } from './dto/update-job-application-dto';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name) private employerModel: Model<EmployerDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(JobApplication.name)
    private jobApplicationModel: Model<JobApplicationDocument>,
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

  async getJobApplications(userId: string, jobId: string) {
    const foundEmployer = await this.employerModel.findById(userId);

    if (!foundEmployer) {
      throw new NotFoundException('Employer not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    const jobApplicationsForThisJob = this.jobApplicationModel
      .find({
        employer: foundEmployer,
        job: foundJob,
      })
      .populate({
        path: 'applicant',
        select: 'first_name last_name email phone_number',
      })
      .select('applicant status');

    return jobApplicationsForThisJob;
  }

  async getJobApplicationById(userId: string, jobApplicationId: string) {
    const foundEmployer = await this.employerModel.findById(userId);

    if (!foundEmployer) {
      throw new NotFoundException('Employer not found');
    }

    const foundJobApplication = await this.jobApplicationModel
      .findById(jobApplicationId)
      .populate({
        path: 'applicant',
        select:
          'first_name last_name email phone_number skills work_experiences educational_background',
      })
      .select('applicant status');

    if (!foundJobApplication) {
      throw new NotFoundException('Job Application not found');
    }

    return foundJobApplication;
  }

  async updateJobApplication(
    employerId: string,
    body: UpdateJobApplicationDto,
    jobApplicationId: string,
  ) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body is empty');
    }

    const employer = await this.employerModel.findById(employerId);

    if (!employer) {
      throw new NotFoundException('employer not found');
    }
    await this.jobApplicationModel.findByIdAndUpdate(jobApplicationId, body, {
      new: true,
    });

    return { message: 'Status updated successfuly' };
  }
}
