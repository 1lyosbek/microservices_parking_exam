import { RpcException } from "@nestjs/microservices";

export class LayerNotFoundException extends RpcException {
    constructor() {
        super("Layer not found_$_404")
    }
}
export class NameOrFloorMustBeRequired extends RpcException {
    constructor() {
        super("Name or Floor must be required_$_400")
    }
}