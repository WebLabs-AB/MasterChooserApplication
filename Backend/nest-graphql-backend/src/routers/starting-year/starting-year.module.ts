import { Module } from '@nestjs/common';
import { StartingYearController } from './starting-year.controller';
import { StartingYearService } from './starting-year.service';

@Module({
  controllers: [StartingYearController],
  providers: [StartingYearService]
})
export class StartingYearModule {}
