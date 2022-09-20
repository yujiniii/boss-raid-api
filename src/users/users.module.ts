import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import { RaidRecord } from 'src/raid-records/entities/raid-record.entity';
import { RaidRecordsService } from 'src/raid-records/raid-records.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,RaidRecord]),
    
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    RaidRecordsService
  ]
})
export class UsersModule {}
