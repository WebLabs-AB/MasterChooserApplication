import { Module } from '@nestjs/common';
import { StartingYearService } from './starting-year.service';
import { StartingYearResolver } from './starting-year.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartingYear } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StartingYear])],
  providers: [StartingYearService, StartingYearResolver],
  exports: [StartingYearService],
})
export class StartingYearModule {}
