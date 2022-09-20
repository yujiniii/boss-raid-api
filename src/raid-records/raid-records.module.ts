import { Module } from '@nestjs/common';
import { RaidRecordsService } from './raid-records.service';
import { RaidRecordsController } from './raid-records.controller';
import { RaidRecord } from './entities/raid-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([RaidRecord,User]),
    
  ],
  controllers: [RaidRecordsController],
  providers: [
    RaidRecordsService,
    UsersService
  ]
})
export class RaidRecordsModule {}
