import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional } from "class-validator";

export class UpdateShotDto {
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
    @IsNumber()
    amount: number;
}
