import { Module } from '@nestjs/common';
import { CourseMainareasService } from './course-mainareas.service';
import { CourseMainareasResolver } from './course-mainareas.resolver';
import { CourseMainAreas } from 'src/entities/NormalTypes/CourseMainAreas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseMainAreas])],
  providers: [CourseMainareasService, CourseMainareasResolver],
  exports: [CourseMainareasService],
})
export class CourseMainareasModule {}
