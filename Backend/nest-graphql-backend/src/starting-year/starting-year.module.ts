import { Module } from '@nestjs/common';
import { StartingYearService } from './starting-year.service';
import { StartingYearResolver } from './starting-year.resolver';

@Module({
  providers: [StartingYearService, StartingYearResolver]
})
export class StartingYearModule {}
