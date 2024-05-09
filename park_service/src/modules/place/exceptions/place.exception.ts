import { RpcException } from "@nestjs/microservices";

export class PlaceNotFoundException extends RpcException{
    constructor() {
        super("Place not found_$_404")
    }
}