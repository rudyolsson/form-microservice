import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormDefinition } from './form-definition.model';
import { FormDefinitionBuilder } from './form-definition.builder';
import {
  FormSubmission,
  FormSubmissionQuestion
} from '../form-submission/form-submission.model';

@Injectable()
export class FormDefinitionService {
  constructor(
    @InjectModel('FormDefinition')
    private readonly formDefinitionModel: Model<FormDefinition>
  ) {}

  async insert(formDefinition: FormDefinition): Promise<Model<FormDefinition>> {
    const { service, questions } = formDefinition;

    const formDefinitionToInsert: FormDefinition = await new FormDefinitionBuilder()
      .setService(service)
      .setQuestions(questions)
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

  public async checkValidQuestions({
    serviceKey,
    questions
  }: {
    serviceKey: string;
    questions: FormSubmissionQuestion[];
  }) {
    const formDefinition = await this.findOne(serviceKey);
    const rules = formDefinition.questions.filter(
      question => question.validation.required || question.validation.maxLength
    );

    rules.forEach(rule => {
      if (rule.validation.required) {
        if (!questions.find(question => question.questionKey === rule.key)) {
          throw new BadRequestException(`${rule.key} is required`);
        }
      }
      if (rule.validation.maxLength) {
        questions.forEach(question => {
          if (
            typeof question.value !== 'string' ||
            question.value.length > rule.maxLength
          ) {
            throw new BadRequestException(
              `${question.questionKey} is too long`
            );
          }
        });
      }
    });
  }
}
