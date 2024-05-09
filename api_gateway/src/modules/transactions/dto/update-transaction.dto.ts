import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    shotCreditId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    shotDebitId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    serviceId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    amount: number;
}
