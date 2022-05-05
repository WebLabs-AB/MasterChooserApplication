import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegularUser } from './entities/RegularUser';
import { SuperUser } from './entities/SuperUser';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
