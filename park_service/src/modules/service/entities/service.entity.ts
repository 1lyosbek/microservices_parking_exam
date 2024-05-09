import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('services')
export class ServiceEntity extends BaseEntity {
    @Column({name: 'park_id', type: 'integer', nullable: false})
    parkId: number;

    @Column({name:'user_id', type: 'integer', nullable: false})
    userId: number;
    
    @Column({name:'started_at', type: 'timestamp', nullable: false})
    startedAt: Date;

    @Column({name:'ended_at', type: 'timestamp', nullable: true})
    endedAt: Date;

    @Column({name:'price', type: 'integer', nullable: false})
    price: number;

    @Column({ name: 'tariff_id', type: 'integer', nullable: true, default: null})
    tariffId: number;
}
