import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional } from "class-validator";

export class UpdateUserTariffDto {
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
    @IsInt()
    tariffId: number;

    @ApiPropertyOptional({
        type: Date
    })
    @IsOptional()
    @IsDate()
    startedAt: Date;

    @ApiPropertyOptional({
        type: Date
    })
    @IsOptional()
    @IsDate()
    endedAt: Date;
}
