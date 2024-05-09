import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDetailDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    avatar: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;   
}
