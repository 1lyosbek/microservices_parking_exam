import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserTariffDto {
    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    tariffId: number;

    @ApiProperty({
        type: Date
    })
    @IsString()
    @IsNotEmpty()
    startedAt: Date;
    
    @ApiProperty({
        type: Date
    })
    @IsString()
    @IsNotEmpty()
    endedAt: Date;
}
