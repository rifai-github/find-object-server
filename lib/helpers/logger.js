"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const logger = (0, pino_1.default)({
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },
    timestamp: () => `,"log_time ":"${(0, moment_timezone_1.default)().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ssZ')}"`,
    level: process.env.PINO_LOG_LEVEL || 'info',
});
exports.default = logger;
//# sourceMappingURL=logger.js.map