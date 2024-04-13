import { Module } from '@nestjs/common';
import { CourseStartingYearController } from './course-starting-year.controller';
import { CourseStartingYearService } from './course-starting-year.service';

@Module({
  controllers: [CourseStartingYearController],
  providers: [CourseStartingYearService]
})
export class CourseStartingYearModule {}
