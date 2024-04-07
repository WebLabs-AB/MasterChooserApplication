import { Module } from '@nestjs/common';
import { CourseStartingYearsService } from './course-starting-years.service';
import { CourseStartingYearsResolver } from './course-starting-years.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseStartingYears } from 'src/entities/NormalTypes/deprecated/CourseStartingYears.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseStartingYears])],
  providers: [CourseStartingYearsService, CourseStartingYearsResolver],
  exports: [CourseStartingYearsService],
})
export class CourseStartingYearsModule {}
