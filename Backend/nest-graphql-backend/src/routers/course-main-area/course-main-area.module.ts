import { Module } from '@nestjs/common';
import { CourseMainAreaService } from './course-main-area.service';
import { CourseMainAreaResolver } from './course-main-area.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseMainArea } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourseMainArea])],
  providers: [CourseMainAreaService, CourseMainAreaResolver],
  exports: [CourseMainAreaService],
})
export class CourseMainAreaModule {}
