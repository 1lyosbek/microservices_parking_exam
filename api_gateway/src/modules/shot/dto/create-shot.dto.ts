import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateShotDto {
    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
