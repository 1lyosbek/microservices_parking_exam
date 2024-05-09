import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateParkDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    owner: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    image: number;
}
