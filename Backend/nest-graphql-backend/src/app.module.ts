import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Own files
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegularUser } from './entities/RegularUser';
import { SuperUser } from './entities/SuperUser';
import { RegularuserModule } from './regularuser/regularuser.module';
import { UniversityModule } from './university/university.module';
import { University } from './entities/University';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'eribi',
      password: 'MySqlDatabase',
      database: 'masterchooserdb',
      entities: [SuperUser, RegularUser, University],
      synchronize: true,
    }),
    RegularuserModule,
    UniversityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
