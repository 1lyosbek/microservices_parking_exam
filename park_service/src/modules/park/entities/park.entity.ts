import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('parks')
export class ParkEntity extends BaseEntity {
    @Column({name: 'name',  type: 'varchar', nullable: false}) 
    name: string;

    @Column({name: 'owner',  type: 'integer', nullable: false}) 
    owner: number;

    @Column({name: 'image',  type: 'integer', nullable: false}) 
    image: number;
}
