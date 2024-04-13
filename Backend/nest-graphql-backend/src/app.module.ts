import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

// Own files
import { environment } from './environments/environment';
import entities from './entities';

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
            entities: entities,
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
            entities: entities,
            autoLoadModels: true,
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
            entities: entities,
            synchronize: true, // Only use doing development.
          };
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
