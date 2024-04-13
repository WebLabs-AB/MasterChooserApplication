import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

// Own files
import { environment } from './environments/environment';
import { StudentModule } from './routers/student/student.module';
import { UniversityModule } from './routers/university/university.module';
import { EducationModule } from './routers/education/education.module';
import { StartingYearModule } from './routers/starting-year/starting-year.module';
import { TeacherModule } from './routers/teacher/teacher.module';
import { MainAreaModule } from './routers/main-area/main-area.module';
import { PeriodModule } from './routers/period/period.module';
import { CourseModule } from './routers/course/course.module';
import { AuthModule } from './common/services/auth.module';
import { AdminModule } from './routers/admin/admin.module';
import { CourseMainAreaModule } from './routers/course-main-area/course-main-area.module';
import { CoursePeriodModule } from './routers/course-period/course-period.module';
import { CourseStartingYearModule } from './routers/course-starting-year/course-starting-year.module';
import { EducationCourseModule } from './routers/education-course/education-course.module';
import { EducationMainAreaModule } from './routers/education-main-area/education-main-area.module';
import { MasterProfileModule } from './routers/master-profile/master-profile.module';
import { MasterProfileCourseOptionalModule } from './routers/master-profile-course-optional/master-profile-course-optional.module';
import { MasterProfileCourseRequiredModule } from './routers/master-profile-course-required/master-profile-course-required.module';
import { MasterSchemaModule } from './routers/master-schema/master-schema.module';
import { MasterSchemaCourseModule } from './routers/master-schema-course/master-schema-course.module';
import { PackageModule } from './routers/package/package.module';
import { PackageCourseModule } from './routers/package-course/package-course.module';

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
        if (configService.get<string>('NODE_ENV') === 'local') {
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: parseInt(configService.get<string>('DB_PORT')),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true, // Only use doing development.
            //dropSchema: true,
          };
        } else if (configService.get<string>('NODE_ENV') === 'test') {
          return {
            type: 'postgres',
            dialect: 'postgres',
            host: environment.dbHost,
            port: environment.dbPort,
            username: environment.dbUsername,
            password: environment.dbPassword,
            database: environment.dbName,
            logging: environment.logging,
            autoLoadModels: true,
            autoLoadEntities: true,
            synchronize: true,
          };
        } else {
          return {
            type: 'postgres',
            host: configService.get<string>('HEROKU_HOST'),
            port: parseInt(configService.get<string>('HEROKU_PORT')),
            username: configService.get<string>('HEROKU_USER'),
            password: configService.get<string>('HEROKU_PASSWORD'),
            database: configService.get<string>('HEROKU_DATABASE'),
            autoLoadEntities: true,
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
    CourseModule,
    EducationModule,
    AdminModule,
    CourseMainAreaModule,
    CoursePeriodModule,
    CourseStartingYearModule,
    EducationCourseModule,
    EducationMainAreaModule,
    MasterProfileModule,
    MasterProfileCourseOptionalModule,
    MasterProfileCourseRequiredModule,
    MasterSchemaModule,
    MasterSchemaCourseModule,
    PackageModule,
    PackageCourseModule,
    StudentModule,
    UniversityModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
