import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormSubmission } from './form-submission.model';
import { FormSubmissionBuilder } from './form-submission.builder';
import { FormDefinitionService } from 'src/form-definition/form-definition.service';

@Injectable()
export class FormSubmissionService {
  constructor(
    @InjectModel('FormSubmission')
    private readonly formSubmissionModel: Model<FormSubmission>,
    private formDefinitionService: FormDefinitionService
  ) {}

  async insert(formSubmission: FormSubmission): Promise<Model<FormSubmission>> {
    const {
      key,
      name,
      date,
      serviceKey,
      questions,
      dateCreated
    } = formSubmission;

    await this.formDefinitionService.checkValidQuestions(questions);

    const formSubmissionToInsert: FormSubmission = await new FormSubmissionBuilder()
      .setKey(key)
      .setName(name)
      .setDate(date)
      .setServiceKey(serviceKey)
      .setQuestions(questions)
      .setDateCreated(new Date())
      .build();

    const newFormSubmission = new this.formSubmissionModel(
      formSubmissionToInsert
    );
    return await newFormSubmission.save();
  }

  async create(formSubmission: FormSubmission): Promise<Model<FormSubmission>> {
    let newFormSubmission;
    try {
      newFormSubmission = await this.insert(formSubmission);
    } catch (error) {
      throw new BadRequestException(
        'Error while creating form submission.',
        error
      );
    }
    if (!newFormSubmission) {
      throw new NotFoundException('Could not find form submission.');
    }
    return newFormSubmission;
  }

  async findAll(): Promise<Model<FormSubmission[]>> {
    const formSubmissions = await this.formSubmissionModel.find().exec();
    return formSubmissions;
  }

  async findOne(id: string) {
    return await this.findFormDefinition(id);
  }

  async update(formSubmission: FormSubmission): Promise<Model<FormSubmission>> {
    const updatedFormDefinition = await this.findFormDefinition(
      formSubmission.id
    );
    return await updatedFormDefinition.set(formSubmission);
  }

  async delete(id: string) {
    const result = await this.formSubmissionModel.deleteOne({ id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find form submission.');
    }
  }

  private async findFormDefinition(id: string): Promise<Model<FormSubmission>> {
    let formSubmission;
    try {
      formSubmission = await this.formSubmissionModel.findOne({ id }).exec();
    } catch (error) {
      throw new BadRequestException('Could not find form submission.');
    }
    if (!formSubmission) {
      throw new NotFoundException('Could not find form submission.');
    }
    return formSubmission;
  }
}
