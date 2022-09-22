import { IsNotEmpty } from 'class-validator'
export class BossRaidEndDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    raidRecordId:number;
}
