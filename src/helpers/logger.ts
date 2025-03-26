import pino from 'pino';
import moment from 'moment-timezone';


const logger = pino({
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },
    timestamp: () => `,"log_time ":"${moment().tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ssZ')}"`,
    level: process.env.PINO_LOG_LEVEL || 'info',
});

export default logger;