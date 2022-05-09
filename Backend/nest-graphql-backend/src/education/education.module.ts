import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files.
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { Education } from 'src/entities/Education';
import { UniversityModule } from 'src/university/university.module';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), UniversityModule], // Allows us to use repository for education and university.
  providers: [EducationService, EducationResolver],
})
export class EducationModule {}
