import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Own files
import { Teacher } from 'src/entities/NormalTypes/Teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService],
})
export class TeacherModule {}
