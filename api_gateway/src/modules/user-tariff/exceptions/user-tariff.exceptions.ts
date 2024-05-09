import { HttpException, HttpStatus } from "@nestjs/common";

export class ShotMonetNotEnough extends HttpException {
    constructor() {
        super("Not enough money to purchase this tariff", HttpStatus.BAD_REQUEST)
    }
}