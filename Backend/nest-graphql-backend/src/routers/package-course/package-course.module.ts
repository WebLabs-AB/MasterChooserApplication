import { Module } from '@nestjs/common';
import { PackageCourseController } from './package-course.controller';
import { PackageCourseService } from './package-course.service';

@Module({
  controllers: [PackageCourseController],
  providers: [PackageCourseService]
})
export class PackageCourseModule {}
