import * as mongoose from 'mongoose';
import { FormDefinitionBuilder } from './form-definition.builder';

export const FormDefinitionModelSchema = new mongoose.Schema({
  service: { type: String, required: true, unique: true },
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
});

export class FormDefinition {
  service: string;
  key: string;
  type: string;
  title: string;
  placeholder: string;
  validation: FormValidation;
  options?: FormOption[];

  constructor(formDefinitionBuilder: FormDefinitionBuilder) {
    if (formDefinitionBuilder) {
      this.service = formDefinitionBuilder.service;
      this.key = formDefinitionBuilder.key;
      this.type = formDefinitionBuilder.type;
      this.title = formDefinitionBuilder.title;
      this.placeholder = formDefinitionBuilder.placeholder;
      this.validation = formDefinitionBuilder.validation;
      this.options = formDefinitionBuilder.options;
    }
  }
}

export interface FormDefinition {
  service: string;
  key: string;
  type: string;
  title: string;
  placeholder: string;
  validation: FormValidation;
  options?: FormOption[];
}
export interface FormValidation {
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  validationMessage?: string;
}

export interface FormOption {
  name: string;
  value: string;
}
