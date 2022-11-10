import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files.
import { MainAreaService } from './main-area.service';
import { MainAreaResolver } from './main-area.resolver';
import { MainArea } from 'src/entities/NormalTypes/MainArea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainArea])],
  providers: [MainAreaService, MainAreaResolver],
  exports: [MainAreaService],
})
export class MainAreaModule {}
