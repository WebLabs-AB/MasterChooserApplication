import { Module } from '@nestjs/common';
import { EducationCourseService } from './education-course.service';
import { EducationCourseResolver } from './education-course.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationCourse } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([EducationCourse])],
  providers: [EducationCourseService, EducationCourseResolver],
  exports: [EducationCourseService],
})
export class EducationCourseModule {}
