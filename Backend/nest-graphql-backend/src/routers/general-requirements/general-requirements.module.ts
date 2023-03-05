import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralRequirements } from 'src/entities';
import { UniversityModule } from '../university/university.module';
import { GeneralRequirementsResolver } from './general-requirements.resolver';
import { GeneralRequirementsService } from './general-requirements.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralRequirements]), UniversityModule], // Allows us to use repository for university.
  providers: [GeneralRequirementsResolver, GeneralRequirementsService],
  exports: [GeneralRequirementsService],
})
export class GeneralRequirementsModule {}
