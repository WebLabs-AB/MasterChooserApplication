import { Module } from '@nestjs/common';
import { MasterSchemaCourseService } from './master-schema-course.service';
import { MasterSchemaCourseResolver } from './master-schema-course.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterSchemaCourse } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MasterSchemaCourse])],
  providers: [MasterSchemaCourseService, MasterSchemaCourseResolver],
  exports: [MasterSchemaCourseService],
})
export class MasterSchemaCourseModule {}
