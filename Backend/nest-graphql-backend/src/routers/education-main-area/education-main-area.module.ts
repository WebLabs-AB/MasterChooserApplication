import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EducationMainAreaService } from './education-main-area.service';
import { EducationMainAreaResolver } from './education-main-area.resolver';
import { EducationMainArea } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([EducationMainArea])],
  providers: [EducationMainAreaService, EducationMainAreaResolver],
  exports: [EducationMainAreaService],
})
export class EducationMainAreaModule {}
