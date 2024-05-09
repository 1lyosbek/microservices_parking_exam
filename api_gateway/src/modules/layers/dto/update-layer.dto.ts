import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateLayerDto {
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
    floor: number;
    
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parkId: number;
}
