import { RpcException } from "@nestjs/microservices";

export class ShotNotFoundException extends RpcException {
    constructor() {
        super("Shot not found_$_404")
    }
}