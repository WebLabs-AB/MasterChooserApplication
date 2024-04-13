import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  providers: [EducationService, EducationResolver],
  exports: [EducationService],
})
export class EducationModule {}
