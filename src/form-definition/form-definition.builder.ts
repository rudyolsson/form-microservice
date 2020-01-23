import {
  FormDefinition,
  FormValidation,
  FormOption
} from './form-definition.model';

export class FormDefinitionBuilder {
  private _service: string;
  private _key: string;
  private _type: string;
  private _title: string;
  private _placeholder: string;
  private _validation: FormValidation;
  private _options: FormOption[];
  private _dateCreated: Date;

  constructor() {}

  build(): FormDefinition {
    return new FormDefinition(this);
  }

  public get service(): string {
    return this._service;
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

  public get validation(): FormValidation {
    return this._validation;
  }

  public get options(): FormOption[] {
    return this._options;
  }

  public get dateCreated(): Date {
    return this._dateCreated;
  }

  public setService(value: string): FormDefinitionBuilder {
    this._service = value;
    return this;
  }

  public setKey(value: string): FormDefinitionBuilder {
    this._key = value;
    return this;
  }

  public setType(value: string): FormDefinitionBuilder {
    this._type = value;
    return this;
  }

  public setTitle(value: string): FormDefinitionBuilder {
    this._title = value;
    return this;
  }

  public setPlaceholder(value: string): FormDefinitionBuilder {
    this._placeholder = value;
    return this;
  }

  public setValidation(value: FormValidation): FormDefinitionBuilder {
    this._validation = value;
    return this;
  }

  public setOptions(value: FormOption[]): FormDefinitionBuilder {
    this._options = value;
    return this;
  }

  public setDateCreated(value: Date): FormDefinitionBuilder {
    this._dateCreated = value;
    return this;
  }
}
