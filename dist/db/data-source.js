"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Entities_1 = __importDefault(require("../modules/User/entity/Entities"));
const baterponto_1 = __importDefault(require("../modules/CheckIn/entity/baterponto"));
dotenv_1.default.config();
const port = parseInt(process.env.DB_PORT || '1433', 10);
const AppDataSource = new typeorm_1.DataSource({
    type: 'mssql',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Entities_1.default, baterponto_1.default],
    migrations: ['src/db/migration/*.ts'],
    subscribers: [],
    extra: {
        trustServerCertificate: true,
        encrypt: true,
    },
});
exports.default = AppDataSource;
