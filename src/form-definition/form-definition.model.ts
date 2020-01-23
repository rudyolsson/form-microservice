import * as mongoose from 'mongoose';
import { FormDefinitionBuilder } from './form-definition.builder';
import { FormQuestionBuilder } from './form-question.builder';

export const FormDefinitionModelSchema = new mongoose.Schema({
  service: { type: String, required: true, unique: true },
  questions: [
    {
      key: { type: String, required: true },
      type: { type: String, required: true },
      title: { type: String, required: true },
      placeholder: { type: String, required: true },
      validation: {
        required: { type: Boolean, required: true },
        maxLength: { type: Number },
        pattern: { type: String },
        validationMessage: { type: String }
      },
      options: [
        {
          name: { type: String },
          value: { type: String }
        }
      ]
    }
  ],
  dateCreated: { type: Date, required: true }
});

export class FormDefinition {
  service: string;
  questions: FormQuestion[];
  dateCreated: Date;

  constructor(formDefinitionBuilder: FormDefinitionBuilder) {
    if (formDefinitionBuilder) {
      this.service = formDefinitionBuilder.service;
      this.questions = formDefinitionBuilder.questions;
      this.dateCreated = formDefinitionBuilder.dateCreated;
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class FormQuestion {
  key: string;
  type: string;
  title: string;
  placeholder: string;
  validation: FormQuestionValidation;
  options?: FormQuestionOption[];

  constructor(formQuestionBuilder: FormQuestionBuilder) {
    if (formQuestionBuilder) {
      this.key = formQuestionBuilder.key;
      this.type = formQuestionBuilder.type;
      this.title = formQuestionBuilder.title;
      this.placeholder = formQuestionBuilder.placeholder;
      this.validation = formQuestionBuilder.validation;
      this.options = formQuestionBuilder.options;
    }
  }
}

export interface FormQuestion {
  key: string;
  type: string;
  title: string;
  placeholder: string;
  validation: FormQuestionValidation;
  options?: FormQuestionOption[];
}
export interface FormQuestionValidation {
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  validationMessage?: string;
}

export interface FormQuestionOption {
  name: string;
  value: string;
}
