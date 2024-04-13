import { Module } from '@nestjs/common';
import { MasterProfileCourseRequiredService } from './master-profile-course-required.service';
import { MasterProfileCourseRequiredResolver } from './master-profile-course-required.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterProfileCourseRequired } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MasterProfileCourseRequired])],
  providers: [
    MasterProfileCourseRequiredService,
    MasterProfileCourseRequiredResolver,
  ],
  exports: [MasterProfileCourseRequiredService],
})
export class MasterProfileCourseRequiredModule {}
