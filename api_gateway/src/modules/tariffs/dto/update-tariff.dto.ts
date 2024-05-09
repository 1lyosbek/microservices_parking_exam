import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTariffDto } from './create-tariff.dto';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTariffDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parkId: number

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    price: number

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    time: number;
}
