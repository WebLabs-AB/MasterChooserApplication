import { Module } from '@nestjs/common';
import { MasterProfileCourseRequiredController } from './master-profile-course-required.controller';
import { MasterProfileCourseRequiredService } from './master-profile-course-required.service';

@Module({
  controllers: [MasterProfileCourseRequiredController],
  providers: [MasterProfileCourseRequiredService]
})
export class MasterProfileCourseRequiredModule {}
