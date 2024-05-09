import { RpcException } from "@nestjs/microservices";

export class UserNotFoundException extends RpcException{
    constructor(){
        super("user not found_$_404")
    }
}

export class UserPhoneAlreadyExist extends RpcException{
    constructor(){
        super("This phone number already exist_$_404")
    }
}