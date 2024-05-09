import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';

export const connectionSource: DataSourceOptions = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
};

export default new DataSource(connectionSource)