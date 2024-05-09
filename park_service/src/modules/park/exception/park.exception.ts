import { RpcException } from "@nestjs/microservices";

export class ParkNotFoundException extends RpcException {
    constructor() {
        super('Park Not Found_$_404')
    }
}