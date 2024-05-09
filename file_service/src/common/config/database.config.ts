import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';
import { FileEntity } from 'src/modules/files/entities/file.entity';

export const connectionSource: DataSourceOptions = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    // entities:[FileEntity],
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
    synchronize: false,
};

console.log("Connecting to");

export default new DataSource(connectionSource)