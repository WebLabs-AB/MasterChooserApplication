import { Module } from '@nestjs/common';
import { CourseStartingYearService } from './course-starting-year.service';
import { CourseStartingYearResolver } from './course-starting-year.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseStartingYear } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourseStartingYear])],
  providers: [CourseStartingYearService, CourseStartingYearResolver],
  exports: [CourseStartingYearService],
})
export class CourseStartingYearModule {}
