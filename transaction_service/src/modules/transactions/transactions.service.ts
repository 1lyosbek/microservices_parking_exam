import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionsRepository } from './interfaces/transaction.repo.interface';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionNotFoundException } from './exceptions/transaction.exceptions';
import { ITransactionUpdateData } from './interfaces/transaction.contr.interface';

@Injectable()
export class TransactionsService {
  constructor(@Inject("ITransactionRepository") private readonly transactionRepository: ITransactionsRepository) {}
  async create(createTransactionDto: CreateTransactionDto):Promise<TransactionEntity> {
    const newTransaction = new TransactionEntity();
    newTransaction.shotCreditId = createTransactionDto.shotCreditId;
    newTransaction.shotDebitId = createTransactionDto.shotDebitId;
    newTransaction.serviceId = createTransactionDto.serviceId;
    newTransaction.amount = createTransactionDto.amount;
    const created = await this.transactionRepository.createTransaction(newTransaction);
    return created;
  }

  async findAll():Promise<Array<TransactionEntity>> {
    const foundTransactions = await this.transactionRepository.getTransactions();
    return foundTransactions;
  }

  async findOne(id: number):Promise<TransactionEntity> {
    const foundTransaction = await this.transactionRepository.getTransactionById(id);
    if (!foundTransaction) {
      throw new TransactionNotFoundException()
    }
    return foundTransaction;
  }

  async update(id: number, updateTransactionDto: ITransactionUpdateData):Promise<TransactionEntity> {
    const foundTransaction = await this.findOne(id);
    foundTransaction.shotCreditId = updateTransactionDto.shotCreditId;
    foundTransaction.shotDebitId = updateTransactionDto.shotDebitId;
    foundTransaction.serviceId = updateTransactionDto.serviceId;
    foundTransaction.amount = updateTransactionDto.amount;
    const updated = await this.transactionRepository.updateTransaction(foundTransaction);
    return updated;
  }

  async remove(entity: TransactionEntity):Promise<TransactionEntity> {
    const deleted = await this.transactionRepository.deleteTransaction(entity);
    return deleted;
  }
}
