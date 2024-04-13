import { Module } from '@nestjs/common';
import { PeriodService } from './period.service';
import { PeriodResolver } from './period.resolver';
import { Period } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  providers: [PeriodService, PeriodResolver],
  exports: [PeriodService],
})
export class PeriodModule {}
