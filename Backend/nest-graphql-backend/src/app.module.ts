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
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [__dirname + '/**/NormalTypes/*.entity{.ts,.js}'],
        synchronize: true, // Only use doing devleopment.
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    UniversityModule,
    EducationModule,
    StartingYearModule,
    TeacherModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
