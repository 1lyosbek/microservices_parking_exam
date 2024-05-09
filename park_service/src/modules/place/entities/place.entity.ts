import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('places')
export class PlaceEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'layer_id', type: 'integer', nullable: false })
    layerId: number;

    @Column({ type: 'integer', nullable: false })
    price: number;
}
