import { RpcException } from "@nestjs/microservices";

export class UserDetailNotFound extends RpcException{
    constructor(){
        super('User detail not found_$_404');
    }
}