import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/roleEnum';

export class UpdateUserDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    password: string;

    @ApiPropertyOptional({
        enum: RoleEnum
    })
    @IsOptional()
    @IsEnum(RoleEnum)
    role: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parkId: number;
}
