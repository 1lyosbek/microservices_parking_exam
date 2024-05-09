import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('user_details')
export class UserDetailEntity extends BaseEntity {
    @Column({name: 'first_name', type: 'varchar', nullable: false})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar', nullable: false})
    lastName: string;

    @Column({name: 'avatar', type: 'integer', nullable: false})
    avatar: number;
    
    @Column({name: 'user_id', type: 'integer', nullable: false})
    userId: number;
}
