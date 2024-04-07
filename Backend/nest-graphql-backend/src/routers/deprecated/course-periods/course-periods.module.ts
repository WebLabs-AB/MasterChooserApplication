import { Module } from '@nestjs/common';
import { CoursePeriodsService } from './course-periods.service';
import { CoursePeriodsResolver } from './course-periods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePeriods } from 'src/entities/NormalTypes/deprecated/CoursePeriods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePeriods])],
  providers: [CoursePeriodsService, CoursePeriodsResolver],
  exports: [CoursePeriodsService],
})
export class CoursePeriodsModule {}
