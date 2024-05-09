import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
    @Column({name: 'shot_credit_id', type: 'integer', nullable: false})
    shotCreditId: number;

    @Column({name:'shot_debit_id', type: 'integer', nullable: false})
    shotDebitId: number;

    @Column({name:'service_id', type: 'integer', nullable: false})
    serviceId: number;
    
    @Column({type: 'integer', nullable: false})
    amount: number;
}
