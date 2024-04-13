import { Module } from '@nestjs/common';
import { MasterProfileCourseOptionalService } from './master-profile-course-optional.service';
import { MasterProfileCourseOptionalResolver } from './master-profile-course-optional.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterProfileCourseOptional } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MasterProfileCourseOptional])],
  providers: [
    MasterProfileCourseOptionalService,
    MasterProfileCourseOptionalResolver,
  ],
  exports: [MasterProfileCourseOptionalService],
})
export class MasterProfileCourseOptionalModule {}
