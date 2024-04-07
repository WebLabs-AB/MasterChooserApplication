import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Own files.
import { Teacher } from 'src/entities/NormalTypes/deprecated/Teacher.entity';
import { CreateTeacherInput } from 'src/inputTypes/create-teacher.input';
import { TeacherService } from './teacher.service';

@Resolver((of) => Teacher)
export class TeacherResolver {
  constructor(private teacherService: TeacherService) {}

  // Query that returns an teacher if it exists in the database.
  @Query((returns) => Teacher)
  async getStudent(@Args('email') email: string): Promise<Teacher> {
    return this.teacherService.findOne(email);
  }

  @Mutation((returns) => Teacher)
  async createNewTeacher(
    @Args('createTeacherInput')
    createTeacherInput: CreateTeacherInput,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherInput);
  }
}
