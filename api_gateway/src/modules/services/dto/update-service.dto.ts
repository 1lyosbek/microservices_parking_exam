import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class UpdateServiceDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parkId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    userId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsDate()
    startedAt: Date;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsDate()
    endedAt: Date;
}
