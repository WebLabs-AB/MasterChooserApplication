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
      entities: [SuperUser, RegularUser],
      synchronize: true,
    }),
    RegularuserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
