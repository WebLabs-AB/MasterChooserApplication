import { Module } from '@nestjs/common';
import { EducationMainAreaController } from './education-main-area.controller';
import { EducationMainAreaService } from './education-main-area.service';

@Module({
  controllers: [EducationMainAreaController],
  providers: [EducationMainAreaService]
})
export class EducationMainAreaModule {}
