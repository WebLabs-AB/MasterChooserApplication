import { Module } from '@nestjs/common';
import { MasterProfileCourseOptionalController } from './master-profile-course-optional.controller';
import { MasterProfileCourseOptionalService } from './master-profile-course-optional.service';

@Module({
  controllers: [MasterProfileCourseOptionalController],
  providers: [MasterProfileCourseOptionalService]
})
export class MasterProfileCourseOptionalModule {}
