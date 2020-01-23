import { FormDefinition, FormQuestion } from './form-definition.model';

export class FormDefinitionBuilder {
  private _service: string;
  private _questions: FormQuestion[];
  private _dateCreated: Date;

  constructor() {}

  build(): FormDefinition {
    return new FormDefinition(this);
  }

  public get service(): string {
    return this._service;
  }

  public get questions(): FormQuestion[] {
    return this._questions;
  }

  public get dateCreated(): Date {
    return this._dateCreated;
  }

  public setService(value: string): FormDefinitionBuilder {
    this._service = value;
    return this;
  }

  public setQuestions(value: FormQuestion[]): FormDefinitionBuilder {
    this._questions = value;
    return this;
  }

  public setDateCreated(value: Date): FormDefinitionBuilder {
    this._dateCreated = value;
    return this;
  }
}
