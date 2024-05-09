import * as dotenv from 'dotenv';
import { IConfig } from '../types/types';
dotenv.config();

export const config: IConfig = {
    serverPort: Number(process.env.SERVER_PORT),
    userServerUrl: process.env.USER_SERVER_URL,
    parkServerUrl: process.env.PARK_SERVER_URL,
    transactionServerUrl: process.env.TRANSACTION_SERVER_URL,
    fileServerUrl: process.env.FILE_SERVER_URL,
    dbPort: Number(process.env.DATABASE_PORT),
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE,
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    jwtKey: process.env.JWT_SECRET_KEY, 
    jwtExpiresIn: process.env.JWT_EXPIRATION
}
