import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTariffDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    parkId: number

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    time: number;
}
