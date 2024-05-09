import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({type: 'varchar', nullable: false})
    phone: string;

    @Column({type: 'varchar', nullable: false})
    password: string;
    
    @Column({type: 'varchar', nullable: false})
    role: string;
    
    @Column({name: 'park_id', type: 'integer', nullable: true})
    parkId: number;
}
