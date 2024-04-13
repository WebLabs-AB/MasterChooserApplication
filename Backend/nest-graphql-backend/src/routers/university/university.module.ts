import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityResolver } from './university.resolver';
import { University } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([University])],
  providers: [UniversityService, UniversityResolver],
  exports: [UniversityService],
})
export class UniversityModule {}
