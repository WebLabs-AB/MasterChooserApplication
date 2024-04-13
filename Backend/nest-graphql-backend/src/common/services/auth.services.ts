import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { Teacher } from 'src/entities/NormalTypes/Teacher.entity';
import { LoginUserInput } from 'src/inputTypes/login-user.input';
//import { StudentService } from 'src/routers/deprecated/student/student.service';
//import { TeacherService } from 'src/routers/deprecated/teacher/teacher.service';

@Injectable()
export class AuthService {
  /*
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Student | null | Teacher> {
    const student = await this.studentService.findOne(email);

    if (student) {
      if (await bcrypt.compare(password, student.password)) {
        delete student.password;
        return student;
      }
    }

    const teacher = await this.teacherService.findOne(email);
    if (teacher) {
      if (await bcrypt.compare(password, teacher.password)) {
        delete teacher.password;
        return teacher;
      }
    }
    return null;
  }

  async generateUserCredentials(
    user: Student | Teacher,
  ): Promise<{ access_token: string }> {
    let payload: string | object | Buffer;

    if (user instanceof Student) {
      payload = {
        email: user.email,
        educationName: user.education.educationName,
        startingYear: user.startingYear,
        universityName: user.university.universityName,
      };
    } else {
      payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async loginUser(
    loginUserInput: LoginUserInput,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );

    if (user) {
      return this.generateUserCredentials(user);
    } else {
      throw new BadRequestException(`Email or password are invalid`);
    }
  }
  */
}
