import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files.
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { Education } from 'src/entities/Education';

@Module({
  imports: [TypeOrmModule.forFeature([Education])], // Allows us to use repository for education.
  providers: [EducationService, EducationResolver],
})
export class EducationModule {}
