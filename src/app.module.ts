import { Module  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RaidRecordsModule } from './raid-records/raid-records.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { typeORMConfig } from './configs/typeorm.config'
import { HttpModule } from '@nestjs/axios';
import { RedisCacheModule } from './cache/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule, 
    RaidRecordsModule,
    HttpModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
