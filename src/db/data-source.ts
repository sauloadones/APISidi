import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotevn from 'dotenv'
import User from '../modules/User/entity/Entities'
import baterponto from '../modules/CheckIn/entity/baterponto'
dotevn.config()

const port = parseInt(process.env.DB_PORT || '1433', 10)

const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, baterponto],
    migrations: ['dist/db/migration/*.js'],
    subscribers: [],
    extra: {
        trustServerCertificate: true, 
        encrypt: true, 
    },
});

export default AppDataSource
