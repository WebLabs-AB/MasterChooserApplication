import { Module } from '@nestjs/common';
import { CoursePeriodController } from './course-period.controller';
import { CoursePeriodService } from './course-period.service';

@Module({
  controllers: [CoursePeriodController],
  providers: [CoursePeriodService]
})
export class CoursePeriodModule {}
