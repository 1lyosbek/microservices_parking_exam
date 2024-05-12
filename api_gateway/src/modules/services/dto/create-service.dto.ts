import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    parkId: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        type: Date
    })
    @IsDate()
    @IsNotEmpty()
    startedAt: Date;

    @ApiProperty({
        type: Date
    })
    @IsDate()
    @IsNotEmpty()
    endedAt: Date;
}
