import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { BossRaidEndDto } from './dto/boss-raid-end.dto';
import { BossRaidStartDto } from './dto/boss-raid-start.dto';
import { RaidRecord } from './entities/raid-record.entity';
import { HttpService } from '@nestjs/axios';
import { RedisCacheService } from 'src/cache/redis.service';

let isEntered:boolean = false

@Injectable()
export class RaidRecordsService {
  constructor(
    @InjectRepository(User)
    private usersReopsitory:Repository<User>,
    @InjectRepository(RaidRecord)
    private raidRecordsReopsitory:Repository<RaidRecord>,
    private readonly httpService:HttpService,
    private cacheManager: RedisCacheService,

    ){}

  

  async Checkstatus() {
    // 보스레이드 중인지?? 상태 조회
    const value = await this.cacheManager.get('ttlTest');
    console.log(value)
    if (typeof value === 'undefined'){
      return `USER 입장 대기중`;
    } else {
        return `userId = ${value.userId}`
    }
    
  }

  async enterRaid(bossRaidStartDto:BossRaidStartDto) {
    // 보스레이드 입장
    const {userId, level} = bossRaidStartDto
    if(isEntered == true){
      return `isEntered = true
      userId = ${userId}`;
    } else {
      isEntered = true;
      const meta = await this.httpService
      .get(`https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json`)
      .toPromise();

      const jsonTest = JSON.parse(JSON.stringify(meta.data)).bossRaids
      const [bossRaids] = jsonTest
      const {bossRaidLimitSeconds,levels} = bossRaids;
      levels[level]['userId'] = userId
      const newGame = await this.raidRecordsReopsitory.create({
        userId,
        level:level,
        score:0,
        enterTime:new Date(),
        endTime:null
      });
      console.log(newGame)
      this.raidRecordsReopsitory.save(newGame)
      await this.cacheManager.set('ttlTest',levels[level], {ttl:bossRaidLimitSeconds});
 
      return `userId = ${userId}
        level = ${level} `;
    }
      
  }


}