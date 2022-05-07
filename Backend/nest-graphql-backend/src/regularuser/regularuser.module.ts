import { Module } from '@nestjs/common';
import { RegularuserService } from './regularuser.service';
import { RegularuserResolver } from './regularuser.resolver';

//Own files.
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegularUser } from 'src/entities/RegularUser';

@Module({
  imports: [TypeOrmModule.forFeature([RegularUser])], // Allows us to use repository for regularuser.
  providers: [RegularuserService, RegularuserResolver],
})
export class RegularuserModule {}
