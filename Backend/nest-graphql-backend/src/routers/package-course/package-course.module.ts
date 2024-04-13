import { Module } from '@nestjs/common';
import { PackageCourseService } from './package-course.service';
import { PackageCourseResolver } from './package-course.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageCourse } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PackageCourse])],
  providers: [PackageCourseService, PackageCourseResolver],
  exports: [PackageCourseService],
})
export class PackageCourseModule {}
