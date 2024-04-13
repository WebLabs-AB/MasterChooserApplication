import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainAreaService } from './main-area.service';
import { MainAreaResolver } from './main-area.resolver';
import { MainArea } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MainArea])],
  providers: [MainAreaService, MainAreaResolver],
  exports: [MainAreaService],
})
export class MainAreaModule {}
