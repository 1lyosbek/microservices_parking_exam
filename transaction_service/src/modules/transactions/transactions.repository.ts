import { InjectRepository } from "@nestjs/typeorm";
import { ITransactionsRepository } from "./interfaces/transaction.repo.interface";
import { TransactionEntity } from "./entities/transaction.entity";
import { Repository } from "typeorm";

export class TransactionRepository implements ITransactionsRepository {
    constructor(@InjectRepository(TransactionEntity) private readonly repository: Repository<TransactionEntity>) {}
    async createTransaction(entity: TransactionEntity): Promise<TransactionEntity> {
        return await this.repository.save(entity); 
    }
    async getTransactionById(id: number): Promise<TransactionEntity> {
        return await this.repository.findOneBy({id});
    }
    async getTransactions(): Promise<TransactionEntity[]> {
        return await this.repository.find();
    }
    async updateTransaction(entity: TransactionEntity): Promise<TransactionEntity> {
        return await this.repository.save(entity);
    }
    async deleteTransaction(entity: TransactionEntity): Promise<TransactionEntity> {
        return await this.repository.remove(entity);
    }
}