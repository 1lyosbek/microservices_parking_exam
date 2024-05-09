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