import { FormDefinition } from '../form-definition/form-definition.model';
import { FormSubmission } from './form-submission.model';

export class FormSubmissionBuilder {
  private _key: string;
  private _name: string;
  private _date: Date;
  private _serviceKey: string;
  private _questions: FormDefinition[];
  private _dateCreated: Date;

  constructor() {}

  build(): FormSubmission {
    return new FormSubmission(this);
  }

  public get key(): string {
    return this._key;
  }

  public get name(): string {
    return this._name;
  }

  public get date(): Date {
    return this._date;
  }

  public get serviceKey(): string {
    return this._serviceKey;
  }

  public get questions(): FormDefinition[] {
    return this._questions;
  }

  public get dateCreated(): Date {
    return this._dateCreated;
  }

  public setKey(value: string): FormSubmissionBuilder {
    this._key = value;
    return this;
  }

  public setName(value: string): FormSubmissionBuilder {
    this._name = value;
    return this;
  }

  public setDate(value: Date): FormSubmissionBuilder {
    this._date = value;
    return this;
  }

  public setServiceKey(value: string): FormSubmissionBuilder {
    this._serviceKey = value;
    return this;
  }

  public setQuestions(value: FormDefinition[]): FormSubmissionBuilder {
    this._questions = value;
    return this;
  }

  public setDateCreated(value: Date): FormSubmissionBuilder {
    this._dateCreated = value;
    return this;
  }
}
