import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/roleEnum";

export class CreateUserDto {
    @ApiProperty({
      type: String
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
      type: String
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
      enum: RoleEnum
    })
    @IsEnum(RoleEnum)
    @IsNotEmpty()
    role: string;

    @ApiPropertyOptional({
      type: Number
    })
    @IsInt()
    @IsOptional()
    parkId: number;
}
