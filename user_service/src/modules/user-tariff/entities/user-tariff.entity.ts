import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('user_tariff')
export class UserTariffEntity extends BaseEntity {
    @Column({name: 'user_id', type: 'integer', nullable: false})
    userId: number;
    @Column({name: 'tariff_id', type: 'integer', nullable: false})
    tariffId: number;
    @Column({name:'started_at', type: 'timestamp', nullable: false})
    startedAt: Date;
    @Column({ name: 'ended_at', type: 'timestamp', nullable: false})
    endedAt: Date;
}
