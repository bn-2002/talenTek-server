import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant, ApplicantDocument } from './schemas/applicant.schema';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectModel(Applicant.name)
    private ApplicantModel: Model<ApplicantDocument>,
  ) {}

  async getApplicantById(id: string) {
    const applicant = await this.ApplicantModel.findById(id).select([
      'first_name',
      'last_name',
      'email',
      'phone_number',
    ]);
    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }
    return applicant;
  }

  async getApplicants(): Promise<Applicant[]> {
    return this.ApplicantModel.find();
  }

  //TODO
  //check if the email or phone number are in used
  async updateApplicant(id: string, body: UpdateApplicantDto) {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body is empty');
    }

    const applicant = await this.ApplicantModel.findById(id);

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }
    await this.ApplicantModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return { message: 'Profile updated successfuly' };
  }
}
