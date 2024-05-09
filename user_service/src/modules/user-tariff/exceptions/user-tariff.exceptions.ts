import { RpcException } from "@nestjs/microservices";

export class UserTariffNotFound extends RpcException{
    constructor(){
        super('User tariff not found_$_404');
    }
}