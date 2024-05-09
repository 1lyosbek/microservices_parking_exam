import { RpcException } from "@nestjs/microservices";

export class TransactionNotFoundException extends RpcException{
    constructor() {
        super("Transaction not found_$_404")
    }
}