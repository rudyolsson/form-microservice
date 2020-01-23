import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Request,
  Query
} from '@nestjs/common';
import { FormDefinitionService } from './form-definition.service';
import { Model } from 'mongoose';
import { FormDefinition } from './form-definition.model';

@Controller('form-definition')
export class FormDefinitionController {
  constructor(private formDefinitionService: FormDefinitionService) {}

  @Get()
  async getOne(@Query('service') service): Promise<Model<FormDefinition>> {
    return await this.formDefinitionService.findOne(service);
  }

  @Get('all')
  async getAll(): Promise<Model<FormDefinition[]>> {
    return await this.formDefinitionService.findAll();
  }

  @Post()
  async create(@Request() req): Promise<Model<FormDefinition>> {
    return await this.formDefinitionService.create(req.body);
  }

  @Put()
  async update(@Request() req): Promise<Model<FormDefinition>> {
    return await this.formDefinitionService.update(req.body);
  }

  @Delete()
  async delete(@Query('service') service): Promise<Model<FormDefinition>> {
    return await this.formDefinitionService.delete(service);
  }
}
