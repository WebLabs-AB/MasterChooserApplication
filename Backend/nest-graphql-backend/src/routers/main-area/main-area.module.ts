import { Module } from '@nestjs/common';
import { MainAreaController } from './main-area.controller';
import { MainAreaService } from './main-area.service';

@Module({
  controllers: [MainAreaController],
  providers: [MainAreaService]
})
export class MainAreaModule {}
