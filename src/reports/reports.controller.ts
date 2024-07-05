import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/CreateReportDto';
import { JobsService } from 'src/jobs/jobs.service';

@Controller('report')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  async createJobReport(@Body() createReportBody: CreateReportDto) {
    return this.reportsService.createJobReport(createReportBody);
  }

  @Get()
  async getAllReports() {
    return this.reportsService.getAllReports();
  }

  @Get(':reportId')
  async getReportById(@Param('reportId') reportId: string) {
    return this.reportsService.getReportById(reportId);
  }
}
