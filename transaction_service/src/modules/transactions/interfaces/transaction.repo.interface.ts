import { TransactionEntity } from "../entities/transaction.entity";

export interface ITransactionsRepository {
    getTransactions(): Promise<TransactionEntity[]>;
    getTransactionById(id: number): Promise<TransactionEntity>;
    createTransaction(entity: TransactionEntity): Promise<TransactionEntity>;
    updateTransaction(entity: TransactionEntity): Promise<TransactionEntity>;
    deleteTransaction(entity: TransactionEntity): Promise<TransactionEntity>;
}