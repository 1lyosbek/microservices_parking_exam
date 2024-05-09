import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('tariffs')
export class TariffEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'park_id', type: 'integer', nullable: false })
    parkId: number;

    @Column({ type: 'numeric', nullable: false })
    price: number;

    @Column({ type: 'integer', nullable: false })
    time: number;
}

