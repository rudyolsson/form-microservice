import { Module } from '@nestjs/common';
import { FormDefinitionController } from './form-definition.controller';
import { FormDefinitionService } from './form-definition.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FormDefinitionModelSchema } from './form-definition.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FormDefinition', schema: FormDefinitionModelSchema }
    ])
  ],
  controllers: [FormDefinitionController],
  providers: [FormDefinitionService]
})
export class FormDefinitionModule {}
