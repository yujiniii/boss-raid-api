import {Entity,BaseEntity,PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn} from 'typeorm'
import { User } from 'src/users/entities/user.entity';

@Entity()
export class RaidRecord extends BaseEntity{
    @PrimaryGeneratedColumn()
    raidRecordId : number;

    @Column({ type: 'int', comment: '레벨' })
    level:number; //enum으로 바꿔야함

    @Column({ type: 'int', comment: '점수' })
    score:number;

    @Column({ type: 'date', comment: '입장시간' })
    enterTime:Date;

    @Column({ type: 'date', comment: '퇴장시간' })
    endTime:Date
    
    @ManyToOne(
        () => User,
        (user) => user.raidRecordId,
      )
    @JoinColumn({ name: 'user_id' })
    userId: User;
}
