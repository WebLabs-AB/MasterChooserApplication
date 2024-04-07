import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Own files.
import { Student } from 'src/entities/NormalTypes/deprecated/Student.entity';
import { UniversityModule } from 'src/routers/deprecated/university/university.module';
import { EducationModule } from 'src/routers/deprecated/education/education.module';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    UniversityModule,
    EducationModule,
  ], // Allows us to use repository for regularuser, university and education.
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
