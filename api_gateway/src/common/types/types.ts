import { RoleEnum } from "../enums/roleEnum";

export interface IConfig {
    serverPort: number,
    userServerUrl: string,
    parkServerUrl: string,
    transactionServerUrl: string,
    fileServerUrl: string,
    dbPort: number;
    dbHost: string;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    jwtKey: string;
    jwtExpiresIn: string;
}

export interface ICurrentUser {
    id: number;
    phone: string; 
    password: string;
    role: RoleEnum;
    parkId?: number;
}