import * as mongoose from 'mongoose';
import { FormSubmissionBuilder } from './form-submission.builder';
import { FormDefinition } from '../form-definition/form-definition.model';

export const FormSubmissionModelSchema = new mongoose.Schema({
  key: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  serviceKey: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  dateCreated: { type: Date, required: true }
});

export class FormSubmission {
  id: string;
  key: string;
  name: string;
  date: Date;
  serviceKey: string;
  questions: FormDefinition[];
  dateCreated: Date;

  constructor(formSubmissionBuilder: FormSubmissionBuilder) {
    if (formSubmissionBuilder) {
      this.key = formSubmissionBuilder.key;
      this.name = formSubmissionBuilder.name;
      this.date = formSubmissionBuilder.date;
      this.serviceKey = formSubmissionBuilder.serviceKey;
      this.questions = formSubmissionBuilder.questions;
      this.dateCreated = formSubmissionBuilder.dateCreated;
    }
  }
}
