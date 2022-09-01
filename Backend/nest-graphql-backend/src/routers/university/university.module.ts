import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files.
import { UniversityService } from './university.service';
import { UniversityResolver } from './university.resolver';
import { University } from 'src/entities/NormalTypes/University.entity';

@Module({
  imports: [TypeOrmModule.forFeature([University])], // Allows us to use repository for university.
  providers: [UniversityService, UniversityResolver],
  exports: [UniversityService],
})
export class UniversityModule {}
