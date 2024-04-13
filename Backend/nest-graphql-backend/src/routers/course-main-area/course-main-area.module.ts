import { Module } from '@nestjs/common';
import { CourseMainAreaController } from './course-main-area.controller';
import { CourseMainAreaService } from './course-main-area.service';

@Module({
  controllers: [CourseMainAreaController],
  providers: [CourseMainAreaService]
})
export class CourseMainAreaModule {}
