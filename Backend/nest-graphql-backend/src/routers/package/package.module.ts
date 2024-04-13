import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageResolver } from './package.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackageService, PackageResolver],
  exports: [PackageService],
})
export class PackageModule {}
