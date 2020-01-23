import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Request,
  Query
} from '@nestjs/common';
import { FormSubmissionService } from './form-submission.service';
import { Model } from 'mongoose';
import { FormSubmission } from './form-submission.model';

@Controller('form-submission')
export class FormSubmissionController {
  constructor(private formSubmissionService: FormSubmissionService) {}

  @Get()
  async getOne(@Query('id') id): Promise<Model<FormSubmission>> {
    return await this.formSubmissionService.findOne(id);
  }

  @Get('all')
  async getAll(): Promise<Model<FormSubmission[]>> {
    return await this.formSubmissionService.findAll();
  }

  @Post()
  async create(@Request() req): Promise<Model<FormSubmission>> {
    return await this.formSubmissionService.create(req.body);
  }

  @Put()
  async update(@Request() req): Promise<Model<FormSubmission>> {
    return await this.formSubmissionService.update(req.body);
  }

  @Delete()
  async delete(@Query('id') id): Promise<Model<FormSubmission>> {
    return await this.formSubmissionService.delete(id);
  }
}
