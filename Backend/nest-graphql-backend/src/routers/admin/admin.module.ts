import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService, AdminResolver],
  exports: [AdminService],
})
export class AdminModule {}
