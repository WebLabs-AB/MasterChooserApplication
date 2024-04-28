import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/NormalTypes/Course.entity';
import { CourseResolver } from './course.resolver';
import { StudentModule } from '../student/student.module';
import { TeacherModule } from '../teacher/teacher.module';
import { EducationCourseModule } from '../education-course/education-course.module';
import { CourseMainAreaModule } from '../course-main-area/course-main-area.module';
import { CoursePeriodModule } from '../course-period/course-period.module';
import { CourseStartingYearModule } from '../course-starting-year/course-starting-year.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    StudentModule,
    TeacherModule,
    EducationCourseModule,
    CourseMainAreaModule,
    CoursePeriodModule,
    CourseStartingYearModule,
  ],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
