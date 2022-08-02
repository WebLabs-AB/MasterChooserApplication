import { Module } from '@nestjs/common';
import { StartingYearService } from './starting-year.service';
import { StartingYearResolver } from './starting-year.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartingYear } from 'src/entities/StartingYear.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StartingYear])], // Allows us to use repository for starting year.
  providers: [StartingYearService, StartingYearResolver],
})
export class StartingYearModule {}
