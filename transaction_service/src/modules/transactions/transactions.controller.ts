import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AllExceptionsFilter } from 'src/lib/rpc-exeptionFilter';
import { ResData } from 'src/lib/resData';
import { TransactionEntity } from './entities/transaction.entity';
import { TRANSACTION_SERVICE } from 'src/common/consts/consts';
import { ITransactionById, ITransactionUpdateDto } from './interfaces/transaction.contr.interface';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(TRANSACTION_SERVICE, 'FindOne')
  async findOne(data: ITransactionById) {
    const shotById = await this.transactionsService.findOne(data.id)
    return new ResData("transaction found", 200, shotById)
  }

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(TRANSACTION_SERVICE, 'FindAll')
  async findAll(data: {}) {
    const allAvailableTransactions = await this.transactionsService.findAll();
    const repeated: { transactions: TransactionEntity[] } = { transactions: allAvailableTransactions };
    const resData = new ResData<{ transactions: Array<TransactionEntity> }>("all transactions", 200, repeated);
    return resData
  }

  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(TRANSACTION_SERVICE, 'Create')
  async create(data: CreateTransactionDto) {
    const created = await this.transactionsService.create(data);
    return new ResData("transaction created successfully", 201, created);
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(TRANSACTION_SERVICE, 'Update')
  async update(data: ITransactionUpdateDto) {
    const updated = await this.transactionsService.update(data.id, data.data);
    return new ResData("transaction updated successfully", 200, updated);
  }
  @UseFilters(new AllExceptionsFilter())
  @GrpcMethod(TRANSACTION_SERVICE, 'Delete')
  async delete(data: ITransactionById) {
    const foundTransaction = await this.transactionsService.findOne(data.id);
    const deleted = await this.transactionsService.remove(foundTransaction);
    return new ResData("transaction deleted successfully", 200, deleted);
  }
}
