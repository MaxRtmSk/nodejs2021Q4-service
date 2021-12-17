"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./common/config"));
const start = async () => {
    try {
        await app_1.default.listen(config_1.default.PORT);
    }
    catch (err) {
        app_1.default.log.error(err);
        process.exit(1);
    }
};
start();
