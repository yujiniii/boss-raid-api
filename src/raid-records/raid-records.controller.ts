import { Controller, Get, Post, Body, Patch, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
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

  @Post('/enter')
  @UsePipes(ValidationPipe)
  enterRaid(@Body() bossRaidStartDto: BossRaidStartDto) {
    return this.raidRecordsService.enterRaid(bossRaidStartDto);
  }

  @Patch('/end')
  @UsePipes(ValidationPipe)
  endRaid(@Body() bossRaidEndDto:BossRaidEndDto) {
    return this.raidRecordsService.endRaid(bossRaidEndDto);
  }

  @Get('/topRankerList')
  viewRank(@Body('userId', ValidationPipe, ParseIntPipe) userId: number) {
    return this.raidRecordsService.viewRank(userId);
  }
}
