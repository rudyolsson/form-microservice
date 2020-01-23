import { Module } from '@nestjs/common';
import { FormSubmissionController } from './form-submission.controller';
import { FormSubmissionService } from './form-submission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSubmissionModelSchema } from './form-submission.model';
import { FormDefinitionModule } from 'src/form-definition/form-definition.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FormSubmission', schema: FormSubmissionModelSchema }
    ]),
    FormDefinitionModule
  ],
  controllers: [FormSubmissionController],
  providers: [FormSubmissionService]
})
export class FormSubmissionModule {}
