import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Education } from 'src/entities/NormalTypes/Education.entity';

// Own files.
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { University } from 'src/entities/NormalTypes/University.entity';
import { CreateStudentInput } from 'src/inputTypes/create-regularuser.input';
import { StudentService } from './student.service';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  // Query that returns all regularusers from the database.
  @Query((returns) => [Student]) // Returns an array of regularusers.
  async regularusers(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  // Query that returns if an regularuser exists in the database.
  @Query((returns) => Student)
  async getRegularuser(@Args('email') email: string): Promise<Student> {
    return this.studentService.findOne(email);
  }

  @ResolveField((returns) => University) // Used to find what university a student goes to.
  async university(@Parent() regularuser: Student): Promise<University> {
    return this.studentService.getUniversity(regularuser.universityName);
  }

  @ResolveField((returns) => Education) // Used to find what education a student studies.
  async education(@Parent() regularuser: Student): Promise<Education> {
    return this.studentService.getEducation(regularuser.educationName);
  }

  @Mutation((returns) => Student)
  async createNewRegularuser(
    @Args('createRegularuserInput')
    createRegularuserInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createRegularuser(createRegularuserInput);
  }
}
