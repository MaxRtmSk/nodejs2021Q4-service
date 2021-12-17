"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.join(__dirname, '../../.env')
});
const config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    AUTH_MODE: process.env.AUTH_MODE === 'true'
};
exports.default = config;
