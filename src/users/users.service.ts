import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { RaidRecord } from 'src/raid-records/entities/raid-record.entity';
import { RedisCacheService } from 'src/cache/redis.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersReopsitory:Repository<User>,
    @InjectRepository(RaidRecord)
    private raidRecordsReopsitory:Repository<RaidRecord>,
    private readonly httpService:HttpService,
    private cacheManager: RedisCacheService,
    ){}

  async create(createUserDto: CreateUserDto) {
    const {name} = createUserDto
    const newUser = await this.usersReopsitory.create({
      name
    });
    await this.usersReopsitory.save(newUser)
    return newUser;
  }


  async findOne(id: number) {
    const records = await this.raidRecordsReopsitory.find({
      where:{
        userId:id
      }
    })
    return records;
  }

}


