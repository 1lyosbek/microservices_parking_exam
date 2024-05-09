import { RpcException } from "@nestjs/microservices";

export class TariffNotFoundException extends RpcException{
    constructor() {
        super("Tariff not found_$_404")
    }
}