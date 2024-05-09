import { RpcException } from "@nestjs/microservices";

export class ServiceNotFoundException extends RpcException {
    constructor() {
        super('Service not found_$_404');
    }
}