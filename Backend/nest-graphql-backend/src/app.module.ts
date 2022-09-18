import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

// Own files
import { StudentModule } from './routers/student/student.module';
import { UniversityModule } from './routers/university/university.module';
import { EducationModule } from './routers/education/education.module';
import { StartingYearModule } from './routers/starting-year/starting-year.module';
import { TeacherModule } from './routers/teacher/teacher.module';
import { AuthModule } from './common/services/auth.module';
import { MainAreaModule } from './routers/main-area/main-area.module';
import { PeriodModule } from './routers/period/period.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // [REQUIRED if want to use env globally among all modules]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        if (configService.get<string>('NODE_ENV') === 'test') {
          return {
            type: 'postgres',
            host: configService.get<string>('LOCAL_HOST'),
            port: parseInt(configService.get<string>('LOCAL_PORT')),
            username: configService.get<string>('LOCAL_POSTGRES_USER'),
            password: configService.get<string>('LOCAL_POSTGRES_PASSWORD'),
            database: configService.get<string>('LOCAL_DATABASE'),
            entities: [__dirname + '/**/NormalTypes/*.entity{.ts,.js}'],
            synchronize: true, // Only use doing development.
            dropSchema: true,
          };
        } else {
          return {
            type: 'postgres',
            host: configService.get<string>('HEROKU_HOST'),
            port: parseInt(configService.get<string>('HEROKU_PORT')),
            username: configService.get<string>('HEROKU_USER'),
            password: configService.get<string>('HEROKU_PASSWORD'),
            database: configService.get<string>('HEROKU_DATABASE'),
            entities: [__dirname + '/**/NormalTypes/*.entity{.ts,.js}'],
            synchronize: true, // Only use doing development.
          };
        }
      },
      inject: [ConfigService],
    }),
    StudentModule,
    UniversityModule,
    EducationModule,
    StartingYearModule,
    TeacherModule,
    MainAreaModule,
    PeriodModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
