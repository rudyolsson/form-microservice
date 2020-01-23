import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionService } from './form-definition.service';

describe('FormDefinitionService', () => {
  let service: FormDefinitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDefinitionService],
    }).compile();

    service = module.get<FormDefinitionService>(FormDefinitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
