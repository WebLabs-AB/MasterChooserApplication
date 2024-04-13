import { Module } from '@nestjs/common';
import { MasterProfileService } from './master-profile.service';
import { MasterProfileResolver } from './master-profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterProfile } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MasterProfile])],
  providers: [MasterProfileService, MasterProfileResolver],
  exports: [MasterProfileService],
})
export class MasterProfileModule {}
