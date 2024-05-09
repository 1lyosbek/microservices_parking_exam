import { RoleEnum } from "src/common/enums/roleEnum";

export interface IUserById {
    id: number;
}

export interface ILoginDto {
    phone: string;
    password: string;
}

export interface IUserUpdateData {
    phone: string;
    password: string;
    role: RoleEnum;
    parkId: number;
}

export interface IUserUpdateDto {
    id: number;
    data: IUserUpdateData;
}