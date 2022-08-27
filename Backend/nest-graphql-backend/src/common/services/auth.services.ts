import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegularUser } from 'src/entities/NormalTypes/RegularUser.entity';
import { SuperUser } from 'src/entities/NormalTypes/SuperUser.entity';
import { LoginUserInput } from 'src/inputTypes/login-user.input';
import { RegularuserService } from 'src/routers/regularuser/regularuser.service';
import { SuperuserService } from 'src/routers/superuser/superuser.service';

@Injectable()
export class AuthService {
  constructor(
    private regularUserService: RegularuserService,
    private superusersService: SuperuserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<RegularUser | null | SuperUser> {
    const regularUser = await this.regularUserService.findOne(email);

    if (regularUser) {
      if (await bcrypt.compare(password, regularUser.password)) {
        delete regularUser.password;
        delete regularUser.email;
        return regularUser;
      }
    }

    const superUser = await this.superusersService.findOne(email);
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
    user: RegularUser | SuperUser,
  ): Promise<{ access_token: string }> {
    let payload: string | object | Buffer;

    if (user instanceof RegularUser) {
      payload = {
        educationName: user.educationName,
        startingYear: user.startingYear,
        universityName: user.universityName,
      };
    } else {
      payload = {
        liuid: user.liuId,
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
