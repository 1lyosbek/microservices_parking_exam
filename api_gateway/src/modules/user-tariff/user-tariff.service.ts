import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { connectionSource } from 'src/common/config/database.config';
import { createConnection, DataSource } from "typeorm"
import { ClientGrpc } from '@nestjs/microservices';
import { USER_PACKAGE, USER_TARIFF_SERVICE } from 'src/common/consts/consts';
import { ShotService } from '../shot/shot.service';
import { ServicesService } from '../services/services.service';
import { TransactionsService } from '../transactions/transactions.service';
import { UserService } from '../users/users.service';
import { TariffsService } from '../tariffs/tariffs.service';
import { ShotMonetNotEnough } from './exceptions/user-tariff.exceptions';
import { ParksService } from '../parks/parks.service';

@Injectable()
export class UserTariffService implements OnModuleInit {
  private userTariffService: any;

  constructor(
    @Inject(USER_PACKAGE) private client: ClientGrpc,
    private readonly shotService: ShotService,
    private readonly serviceServcie: ServicesService,
    private readonly transactionService: TransactionsService,
    private readonly userService: UserService,
    private readonly tariffService: TariffsService,
    private readonly parkService: ParksService
  ) { }

  onModuleInit() {
    this.userTariffService = this.client.getService<any>(USER_TARIFF_SERVICE);
  }
  async create(createUserTariffDto: CreateUserTariffDto) {
    const { data: foundUser } = await this.userService.findOne(createUserTariffDto.userId);
    const {data: foundCreditShot} = await this.shotService.findShotByUserId(foundUser.id);
    const {data: foundTariff } = await this.tariffService.findOne(createUserTariffDto.tariffId);
    const {data: foundPark} = await this.parkService.findOneById(foundTariff.parkId);
    const {data: foundDebitShot} = await this.shotService.findShotByUserId(foundPark.owner);
    const connection: DataSource = await createConnection(connectionSource);
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createServiceData = {
        parkId: foundTariff.parkId,
        userId: createUserTariffDto.userId,
        startedAt: createUserTariffDto.startedAt,
        endedAt: createUserTariffDto.endedAt,
        tariffId: createUserTariffDto.tariffId,
        price: foundTariff.price 
      }
      if (foundCreditShot.amount < foundTariff.price) {
        throw new ShotMonetNotEnough()
      }
      const createdService = await this.serviceServcie.create(createServiceData);
      console.log("created Service :", createdService);
      
      const createdUserTariff = await this.userTariffService.create(createUserTariffDto);
      const updateCreditShotData = {
        userId: foundUser.id,
        amount: foundCreditShot.amount - foundTariff.price
      }
      const shot1 = await this.shotService.update(foundCreditShot.id, updateCreditShotData);
      console.log("shot 1 :", shot1);
      
      const updateDebitShotData = {
        userId: foundPark.owner,
        amount: foundDebitShot.amount + foundTariff.price
      }
      const shot2 = await this.shotService.update(foundPark.owner, updateDebitShotData);
      console.log("shot 2 :", shot2);
      const createTransactionDto = {
        shotCreditId: foundCreditShot.id,
        shotDebitId: foundDebitShot.id,
        serviceId: createdService.id,
        amount: foundTariff.price
      }
      const transac = await this.transactionService.create(createTransactionDto);
      console.log("transaction :", transac);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log("error :", err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const foundUserTariffs = await this.userTariffService.findAll({}).toPromise();
    return foundUserTariffs;
  }

  async findOne(id: number) {
    const foundUserTariff = await this.userTariffService.findOne({ id }).toPromise(); 
    return foundUserTariff;
  }

  async remove(id: number) {
    const deletedUserTariff = await this.userTariffService.delete({id}).toPromise();
    return deletedUserTariff;
  }
}
