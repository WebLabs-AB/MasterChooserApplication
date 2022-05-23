import { Module } from '@nestjs/common';
import { RegularuserService } from './regularuser.service';
import { RegularuserResolver } from './regularuser.resolver';

//Own files.
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegularUser } from 'src/entities/RegularUser';
import { UniversityModule } from 'src/university/university.module';
import { EducationModule } from 'src/education/education.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegularUser]),
    UniversityModule,
    EducationModule,
  ], // Allows us to use repository for regularuser, university and education.
  providers: [RegularuserService, RegularuserResolver],
})
export class RegularuserModule {}
