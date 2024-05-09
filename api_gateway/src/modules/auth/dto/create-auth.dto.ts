import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
