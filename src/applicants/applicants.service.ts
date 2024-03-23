import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant, ApplicantDocument } from './schemas/applicant.schema';
import {
  JobApplication,
  JobApplicationDocument,
} from 'src/jobApplications/schemas/jobApplication.schema';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectModel(Applicant.name)
    private applicantModel: Model<ApplicantDocument>,
    @InjectModel(JobApplication.name)
    private jobApplicationModel: Model<JobApplicationDocument>,
    @InjectModel(Job.name)
    private jobModel: Model<JobDocument>,
  ) {}

  async getJobApplicationStatus(applicantId: string, jobId: string) {
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
      return {
        hasApplied: true,
      };
    } else {
      return {
        hasApplied: false,
      };
    }
  }

  async getApplicantById(id: string) {
    const applicant = await this.applicantModel
      .findById(id)
      .select(['first_name', 'last_name', 'email', 'phone_number']);
    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }
    return applicant;
  }

  async getApplicants(): Promise<Applicant[]> {
    return this.applicantModel.find();
  }

  // TODO
  // check if the email or phone number are in used
  async updateApplicant(id: string, body: UpdateApplicantDto) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body is empty');
    }

    const applicant = await this.applicantModel.findById(id);

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }
    await this.applicantModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return { message: 'Profile updated successfuly' };
  }
}
