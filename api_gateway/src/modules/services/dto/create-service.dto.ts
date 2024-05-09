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
        type: Number
    })
    @IsDate()
    @IsNotEmpty()
    startedAt: Date;

    @ApiProperty({
        type: Number
    })
    @IsDate()
    @IsNotEmpty()
    endedAt: Date;
}
