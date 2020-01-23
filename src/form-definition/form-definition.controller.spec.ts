import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionController } from './form-definition.controller';

describe('FormDefinition Controller', () => {
  let controller: FormDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormDefinitionController],
    }).compile();

    controller = module.get<FormDefinitionController>(FormDefinitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
