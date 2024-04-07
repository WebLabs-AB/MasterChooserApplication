import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files.
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course } from 'src/entities/NormalTypes/deprecated/Course.entity';
import { StudentModule } from '../student/student.module';
import { TeacherModule } from '../teacher/teacher.module';
import { CourseEducationsModule } from '../course-educations/course-educations.module';
import { CourseMainareasModule } from '../course-mainareas/course-mainareas.module';
import { CoursePeriodsModule } from '../course-periods/course-periods.module';
import { CourseStartingYearsModule } from '../course-starting-years/course-starting-years.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    StudentModule,
    TeacherModule,
    CourseEducationsModule,
    CourseMainareasModule,
    CoursePeriodsModule,
    CourseStartingYearsModule,
  ],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
