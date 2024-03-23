import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Employer,
  EmployerDocument,
} from 'src/employers/schemas/employer.schema';
import {
  JobApplication,
  JobApplicationDocument,
} from './schemas/jobApplication.schema';
import {
  Applicant,
  ApplicantDocument,
} from 'src/applicants/schemas/applicant.schema';
import { Job } from 'src/jobs/schemas/job.schema';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectModel(JobApplication.name)
    private jobApplicationModel: Model<JobApplicationDocument>,
    @InjectModel(Job.name)
    private jobModel: Model<JobApplicationDocument>,
    @InjectModel(Employer.name) private employerModel: Model<EmployerDocument>,
    @InjectModel(Applicant.name)
    private applicantModel: Model<ApplicantDocument>,
  ) {}

  async createJobApplication(applicantId: string, jobId: string) {
    const foundApplicant = await this.applicantModel.findById(applicantId);

    if (!foundApplicant) {
      throw new NotFoundException('Applicant not found');
    }

    const foundJob = await this.jobModel.findById(jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    const duplicatedJobApplication = await this.jobApplicationModel.findOne({
      applicant: foundApplicant._id,
      job: foundJob._id,
    });

    if (duplicatedJobApplication) {
      throw new UnauthorizedException(
        'You have already applied for this job position.',
      );
    }

    const data = {
      employer: foundJob.employer,
      applicant: foundApplicant._id,
      job: foundJob._id,
    };

    const newJobApplication = new this.jobApplicationModel(data);

    newJobApplication.save();

    return {
      message: 'You successfully applied for this job position.',
    };
  }
}
