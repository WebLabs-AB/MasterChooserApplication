import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegularUser } from 'src/entities/RegularUser.entity';
import { RegularuserService } from 'src/regularuser/regularuser.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => RegularuserService))
    private usersService: RegularuserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        delete user.email;
        return user;
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
}
