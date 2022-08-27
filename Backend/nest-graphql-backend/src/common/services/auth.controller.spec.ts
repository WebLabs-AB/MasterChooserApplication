import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { RegularUser } from 'src/entities/NormalTypes/RegularUser.entity';
import { LoginUserInput } from 'src/inputTypes/login-user.input';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.services';
import { BadRequestException } from '@nestjs/common';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  const mockEmail = 'erikbirgersson98@gmail.com';
  const mockPassword = 'Brummer98';

  async function mockRegularUserFindOne(): Promise<RegularUser> {
    const user = new RegularUser();
    user.email = mockEmail;

    const SALT = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(mockPassword, SALT);
    return user;
  }

  async function mockValidateUser(
    password: string,
  ): Promise<RegularUser | null> {
    const regularUser = await mockRegularUserFindOne();

    if (regularUser) {
      if (await bcrypt.compare(password, regularUser.password)) {
        delete regularUser.password;
        delete regularUser.email;
        return regularUser;
      }
    }
    return null;
  }

  function mockGenerateUserCredentials(): {
    access_token: string;
  } {
    return {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZHVjYXRpb25OYW1lIjoiRGF0YXRla25payIsInN0YXJ0aW5nWWVhciI6MjAxOSwidW5pdmVyc2l0eU5hbWUiOiJDaGFsbWVycyIsImlhdCI6MTY2MTU5Mzg3MiwiZXhwIjoxNjYxNTkzOTMyfQ.rwfdPgnNWzCB0UwrYXbxpVfNpoNdioa6PxK2B5WcQMg',
    };
  }

  async function mockLoginUser(loginUserInput: LoginUserInput): Promise<{
    access_token: string;
  }> {
    const user = await mockValidateUser(loginUserInput.password);

    if (user) {
      return mockGenerateUserCredentials();
    } else {
      return {
        access_token: 'failed',
      };
    }
  }

  const mockAuthService = {
    loginUser: jest.fn(
      (
        loginUserInput: LoginUserInput,
      ): Promise<{
        access_token: string;
      }> => mockLoginUser(loginUserInput),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
  });

  describe('AuthResolver', () => {
    it('should be defined', () => {
      expect(authResolver).toBeDefined();
    });

    it('should logging in an user', async () => {
      const result = await authResolver.loginUser({
        email: mockEmail,
        password: mockPassword,
      });

      expect(result).toEqual({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZHVjYXRpb25OYW1lIjoiRGF0YXRla25payIsInN0YXJ0aW5nWWVhciI6MjAxOSwidW5pdmVyc2l0eU5hbWUiOiJDaGFsbWVycyIsImlhdCI6MTY2MTU5Mzg3MiwiZXhwIjoxNjYxNTkzOTMyfQ.rwfdPgnNWzCB0UwrYXbxpVfNpoNdioa6PxK2B5WcQMg',
      });
    });

    it('should throw an error when logging in an user', async () => {
      const result = await authResolver.loginUser({
        email: mockEmail,
        password: 'wrongPassword',
      });

      console.log(result);
      expect(result).toEqual({
        access_token: 'failed',
      });
    });
  });
});
