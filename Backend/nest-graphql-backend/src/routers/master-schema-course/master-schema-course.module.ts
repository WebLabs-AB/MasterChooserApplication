import { Module } from '@nestjs/common';
import { MasterSchemaCourseController } from './master-schema-course.controller';
import { MasterSchemaCourseService } from './master-schema-course.service';

@Module({
  controllers: [MasterSchemaCourseController],
  providers: [MasterSchemaCourseService]
})
export class MasterSchemaCourseModule {}
