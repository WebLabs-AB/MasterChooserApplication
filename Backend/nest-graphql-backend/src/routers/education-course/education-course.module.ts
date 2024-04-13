import { Module } from '@nestjs/common';
import { EducationCourseController } from './education-course.controller';
import { EducationCourseService } from './education-course.service';

@Module({
  controllers: [EducationCourseController],
  providers: [EducationCourseService]
})
export class EducationCourseModule {}
