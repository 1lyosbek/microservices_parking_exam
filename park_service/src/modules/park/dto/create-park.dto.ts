import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateParkDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    owner: number;
    
    @IsInt()
    @IsNotEmpty()
    image: number;
}
