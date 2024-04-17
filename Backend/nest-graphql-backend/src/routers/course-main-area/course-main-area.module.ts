import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseMainAreaService } from './course-main-area.service';
import { CourseMainAreaResolver } from './course-main-area.resolver';
import { Course, CourseMainArea, MainArea } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourseMainArea, Course, MainArea])],
  providers: [CourseMainAreaService, CourseMainAreaResolver],
  exports: [CourseMainAreaService],
})
export class CourseMainAreaModule {}
