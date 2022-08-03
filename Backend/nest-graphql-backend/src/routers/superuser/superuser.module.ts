import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files
import { SuperUser } from 'src/entities/SuperUser.entity';
import { SuperuserService } from './superuser.service';
import { SuperuserResolver } from './superuser.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SuperUser])],
  providers: [SuperuserService, SuperuserResolver],
  exports: [SuperuserService],
})
export class SuperuserModule {}
