import { Module } from '@nestjs/common';
import { MasterSchemaService } from './master-schema.service';
import { MasterSchemaResolver } from './master-schema.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterSchema } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MasterSchema])],
  providers: [MasterSchemaService, MasterSchemaResolver],
  exports: [MasterSchemaResolver],
})
export class MasterSchemaModule {}
