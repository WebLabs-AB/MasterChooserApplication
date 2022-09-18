import { Module } from '@nestjs/common';
import { PeriodService } from './period.service';
import { PeriodResolver } from './period.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from 'src/entities/NormalTypes/Period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  providers: [PeriodService, PeriodResolver],
  exports: [PeriodService],
})
export class PeriodModule {}
