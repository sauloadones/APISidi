"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const data_source_1 = __importDefault(require("./db/data-source"));
const celebrate_1 = require("celebrate");
const AppError_1 = __importDefault(require("./shared/errors/AppError"));
const routes_1 = __importDefault(require("./shared/routes/routes"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
const options = {
    key: fs_1.default.readFileSync('./private.key'),
    cert: fs_1.default.readFileSync('./certificate.crt')
};
app.use((0, cors_1.default)({
    origin: 'https://stunning-gingersnap-bdc1f0.netlify.app/'
}));
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.use((0, celebrate_1.errors)());
app.use((error, req, res, next) => {
    if (error instanceof AppError_1.default) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
// Initialize DataSource and start server
data_source_1.default.initialize()
    .then(() => {
    console.log('Connected to the Database');
    const port = process.env.PORT || 3000; // Use port from .env or fallback to 3000
    https_1.default.createServer(options, app).listen(443, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if DB connection fails
});
