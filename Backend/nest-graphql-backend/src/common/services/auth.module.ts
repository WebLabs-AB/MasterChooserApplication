import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { AuthService } from './auth.services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegularuserModule } from 'src/routers/regularuser/regularuser.module';
import { SuperuserModule } from 'src/routers/superuser/superuser.module';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    RegularuserModule,
    SuperuserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
