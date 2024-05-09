import * as dotenv from "dotenv";
import { IConfig } from "../types/types";

dotenv.config();

export const config: IConfig = {
    dbPort: Number(process.env.DATABASE_PORT),
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE,
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD
}