import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { Teacher } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService],
})
export class TeacherModule {}
