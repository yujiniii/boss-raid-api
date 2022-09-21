import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { RaidRecordsService } from './raid-records.service';
import { BossRaidEndDto } from './dto/boss-raid-end.dto';
import { BossRaidStartDto } from './dto/boss-raid-start.dto';


@Controller('bossRaid') // API 명세에 따른 root 수정
export class RaidRecordsController {
  constructor(private readonly raidRecordsService: RaidRecordsService) {}


  @Get()
  Checkstatus() {
    return this.raidRecordsService.Checkstatus();
  }


}
