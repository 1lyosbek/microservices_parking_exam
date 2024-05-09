import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    shotCreditId: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    shotDebitId: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    serviceId: number;

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
