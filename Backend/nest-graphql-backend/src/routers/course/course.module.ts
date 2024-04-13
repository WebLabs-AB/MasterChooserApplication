import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/NormalTypes/Course.entity';
import { CourseResolver } from './course.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
