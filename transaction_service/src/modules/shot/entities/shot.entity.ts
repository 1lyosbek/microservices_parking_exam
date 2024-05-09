import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('shots')
export class ShotEntity extends BaseEntity {
    @Column({ name: 'user_id', type: 'integer', nullable: false})
    userId: number;
    @Column({type: 'integer', nullable: false})
    amount: number;
}
