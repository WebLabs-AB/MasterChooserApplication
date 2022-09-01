import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/inputTypes/login-user.input';
import { LoggedUserOutput } from 'src/outputTypes/logged-user.ouput';
import { AuthService } from './auth.services';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.loginUser(loginUserInput);
  }
}
