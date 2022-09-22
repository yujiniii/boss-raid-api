import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,OneToMany,Column } from "typeorm";
import { RaidRecord } from "src/raid-records/entities/raid-record.entity";


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    userId:number;

    @Column()
    name:string;

    // @Column({ nullable: true })
    // raidRecordId : number;
    
    @OneToMany(
        ()=>RaidRecord,
        (raidRecord)=>raidRecord.userId
        )
    @JoinColumn()
    raidRecord:RaidRecord[]
}
