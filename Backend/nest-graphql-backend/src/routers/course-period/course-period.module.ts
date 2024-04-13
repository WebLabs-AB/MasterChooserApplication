import { Module } from '@nestjs/common';
import { CoursePeriodService } from './course-period.service';
import { CoursePeriodResolver } from './course-period.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePeriod } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePeriod])],
  providers: [CoursePeriodService, CoursePeriodResolver],
  exports: [CoursePeriodService],
})
export class CoursePeriodModule {}
