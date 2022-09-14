import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { Teacher } from 'src/entities/NormalTypes/Teacher.entity';
import { LoginUserInput } from 'src/inputTypes/login-user.input';
import { StudentService } from 'src/routers/student/student.service';
import { TeacherService } from 'src/routers/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Student | null | Teacher> {
    const regularUser = await this.studentService.findOne(email);

    if (regularUser) {
      if (await bcrypt.compare(password, regularUser.password)) {
        delete regularUser.password;
        delete regularUser.email;
        return regularUser;
      }
    }

    const superUser = await this.teacherService.findOne(email);
    if (superUser) {
      if (await bcrypt.compare(password, superUser.password)) {
        delete superUser.password;
        delete superUser.email;
        return superUser;
      }
    }
    return null;
  }

  async generateUserCredentials(
    user: Student | Teacher,
  ): Promise<{ access_token: string }> {
    let payload: string | object | Buffer;

    if (user instanceof Student) {
      console.log(user);
      payload = {
        educationName: user.education.educationName,
        startingYear: user.startingYear,
        universityName: user.university.universityName,
      };
    } else {
      payload = {
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
}
