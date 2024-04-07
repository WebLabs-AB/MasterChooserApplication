import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files.
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { Education } from 'src/entities/NormalTypes/deprecated/Education.entity';
import { UniversityModule } from 'src/routers/deprecated/university/university.module';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), UniversityModule], // Allows us to use repository for education and university.
  providers: [EducationService, EducationResolver],
  exports: [EducationService],
})
export class EducationModule {}
