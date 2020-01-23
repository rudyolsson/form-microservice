import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FormDefinitionModule } from './form-definition/form-definition.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/test'), FormDefinitionModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
