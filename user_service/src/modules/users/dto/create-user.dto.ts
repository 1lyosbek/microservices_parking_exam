import { RoleEnum } from "src/common/enums/roleEnum";

export class CreateUserDto {
    phone: string;
    password: string;
    role: RoleEnum;
    parkId: number;
}
