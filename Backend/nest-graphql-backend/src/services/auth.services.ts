import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegularUser } from 'src/entities/RegularUser.entity';
import { LoginUserInput } from 'src/inputTypes/login-user.input';
import { RegularuserService } from 'src/routers/regularuser/regularuser.service';
import { SuperuserService } from 'src/routers/superuser/superuser.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => RegularuserService))
    @Inject(forwardRef(() => SuperuserService))
    private usersService: RegularuserService,
    private superusersService: SuperuserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const regularUser = await this.usersService.findOne(email);
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

  async generateUserCredentials(user: RegularUser) {
    const payload = {
      educationName: user.educationName,
      startingYear: user.startingYear,
      universityName: user.universityName,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );

    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return this.generateUserCredentials(user);
    }
  }
}
