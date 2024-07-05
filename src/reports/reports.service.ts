import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { Report, ReportDocument } from './schemas/report.schema';
import { CreateReportDto } from './dto/CreateReportDto';
import {
  Employer,
  EmployerDocument,
} from 'src/employers/schemas/employer.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<JobDocument>,
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
    @InjectModel(Employer.name)
    private employerModel: Model<EmployerDocument>,
  ) {}

  async createJobReport(createReportBody: CreateReportDto) {
    const foundJob = await this.jobModel.findById(createReportBody.jobId);

    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }

    const data = {
      job: foundJob._id,
      message: createReportBody.message,
    };

    const newReport = new this.reportModel(data);

    newReport.save();

    return {
      message: 'Job Report saved succuessfully',
    };
  }

  async getAllReports() {
    return this.reportModel.find();
  }

  async getReportById(reportId: string) {
    const foundReport = await this.reportModel.findById(reportId);

    if (!foundReport) {
      throw new NotFoundException('Report not found');
    }

    return foundReport;
  }
}
