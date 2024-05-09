import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TRANSACTION_PACKAGE, TRANSSERVICE_SERVICE } from 'src/common/consts/consts';
import { ClientGrpc } from '@nestjs/microservices';
import { ShotService } from '../shot/shot.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class TransactionsService implements OnModuleInit{
  private transactionService: any;

  constructor(
    @Inject(TRANSACTION_PACKAGE) private client: ClientGrpc,
    private readonly shotService: ShotService,
    private readonly serviceService: ServicesService
  ) { }

  onModuleInit() {
    this.transactionService = this.client.getService<any>(TRANSSERVICE_SERVICE);
  }
  async create(createTransactionDto: CreateTransactionDto) {
    await this.shotService.findOne(createTransactionDto.shotCreditId);
    await this.shotService.findOne(createTransactionDto.shotDebitId);
    await this.serviceService.findOne(createTransactionDto.serviceId);
    const createdTransaction = await this.transactionService.create(createTransactionDto).toPromise();
    return createdTransaction;
  }

  async findAll() {
    const foundTransactions = await this.transactionService.findAll({}).toPromise();
    return foundTransactions;
  }

  async findOne(id: number) {
    const foundTransaction = await this.transactionService.findOneById({id}).toPromise();
    return foundTransaction;
  }

  async remove(id: number) {
    const deletedTransaction = await this.transactionService.delete({id}).toPromise();
    return deletedTransaction;
  }
}
