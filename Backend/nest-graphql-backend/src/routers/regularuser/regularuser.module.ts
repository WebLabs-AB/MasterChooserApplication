import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Own files.
import { RegularUser } from 'src/entities/NormalTypes/RegularUser.entity';
import { UniversityModule } from 'src/routers/university/university.module';
import { EducationModule } from 'src/routers/education/education.module';
import { RegularuserService } from './regularuser.service';
import { RegularuserResolver } from './regularuser.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegularUser]),
    UniversityModule,
    EducationModule,
  ], // Allows us to use repository for regularuser, university and education.
  providers: [RegularuserService, RegularuserResolver],
  exports: [RegularuserService],
})
export class RegularuserModule {}
