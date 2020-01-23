import {
  FormQuestion,
  FormQuestionValidation,
  FormQuestionOption
} from './form-definition.model';

export class FormQuestionBuilder {
  private _key: string;
  private _type: string;
  private _title: string;
  private _placeholder: string;
  private _validation: FormQuestionValidation;
  private _options: FormQuestionOption[];

  constructor() {}

  build(): FormQuestion {
    return new FormQuestion(this);
  }

  public get key(): string {
    return this._key;
  }

  public get type(): string {
    return this._type;
  }

  public get title(): string {
    return this._title;
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  public get validation(): FormQuestionValidation {
    return this._validation;
  }

  public get options(): FormQuestionOption[] {
    return this._options;
  }

  public setKey(value: string): FormQuestionBuilder {
    this._key = value;
    return this;
  }

  public setType(value: string): FormQuestionBuilder {
    this._type = value;
    return this;
  }

  public setTitle(value: string): FormQuestionBuilder {
    this._title = value;
    return this;
  }

  public setPlaceholder(value: string): FormQuestionBuilder {
    this._placeholder = value;
    return this;
  }

  public setValidation(value: FormQuestionValidation): FormQuestionBuilder {
    this._validation = value;
    return this;
  }

  public setOptions(value: FormQuestionOption[]): FormQuestionBuilder {
    this._options = value;
    return this;
  }
}
