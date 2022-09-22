import { IsNotEmpty } from 'class-validator'

export class BossRaidStartDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    level: number;
}
