import { Module } from '@nestjs/common';
import { MasterSchemaController } from './master-schema.controller';
import { MasterSchemaService } from './master-schema.service';

@Module({
  controllers: [MasterSchemaController],
  providers: [MasterSchemaService]
})
export class MasterSchemaModule {}
