import { Module } from '@nestjs/common';
import { CourseEducationsService } from './course-educations.service';
import { CourseEducationsResolver } from './course-educations.resolver';
import { CourseEducations } from 'src/entities/NormalTypes/CourseEducations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEducations])],
  providers: [CourseEducationsService, CourseEducationsResolver],
  exports: [CourseEducationsService],
})
export class CourseEducationsModule {}
