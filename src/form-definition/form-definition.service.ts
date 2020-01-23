import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormDefinition } from './form-definition.model';
import { FormDefinitionBuilder } from './form-definition.builder';

@Injectable()
export class FormDefinitionService {
  constructor(
    @InjectModel('FormDefinition')
    private readonly formDefinitionModel: Model<FormDefinition>
  ) {}

  async insert(formDefinition: FormDefinition): Promise<Model<FormDefinition>> {
    const {
      service,
      key,
      type,
      title,
      placeholder,
      validation,
      options
    } = formDefinition;

    const formDefinitionToInsert: FormDefinition = await new FormDefinitionBuilder()
      .setService(service)
      .setKey(key)
      .setType(type)
      .setTitle(title)
      .setPlaceholder(placeholder)
      .setValidation(validation)
      .setOptions(options)
      .setDateCreated(new Date())
      .build();

    const newFormDefinition = new this.formDefinitionModel(
      formDefinitionToInsert
    );
    return await newFormDefinition.save();
  }

  async create(formDefinition: FormDefinition): Promise<Model<FormDefinition>> {
    let newFormDefinition;
    try {
      newFormDefinition = await this.insert(formDefinition);
    } catch (error) {
      throw new BadRequestException(
        'Error while creating form definition.',
        error
      );
    }
    if (!newFormDefinition) {
      throw new NotFoundException('Could not find form definition.');
    }
    return newFormDefinition;
  }

  async findAll(): Promise<Model<FormDefinition[]>> {
    const formDefinitions = await this.formDefinitionModel.find().exec();
    return formDefinitions;
  }

  async findOne(service: string) {
    return await this.findFormDefinition(service);
  }

  async update(formDefinition: FormDefinition): Promise<Model<FormDefinition>> {
    const updatedFormDefinition = await this.findFormDefinition(
      formDefinition.service
    );
    return await updatedFormDefinition.set(formDefinition);
  }

  async delete(service: string) {
    const result = await this.formDefinitionModel.deleteOne({ service }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find form definition.');
    }
  }

  private async findFormDefinition(
    service: string
  ): Promise<Model<FormDefinition>> {
    let formDefinition;
    try {
      formDefinition = await this.formDefinitionModel
        .findOne({ service })
        .exec();
    } catch (error) {
      throw new BadRequestException('Could not find form definition.');
    }
    if (!formDefinition) {
      throw new NotFoundException('Could not find form definition.');
    }
    return formDefinition;
  }
}
