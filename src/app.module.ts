import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RaidRecordsModule } from './raid-records/raid-records.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { typeORMConfig } from './configs/typeorm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule, 
    RaidRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
