"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFactory = void 0;
exports.random = random;
class ResponseFactory {
    static success(data = {}, message = 'success') {
        return {
            status: 'success',
            message,
            data
        };
    }
    static error(message, data = null) {
        return {
            status: 'error',
            message,
            data
        };
    }
}
exports.ResponseFactory = ResponseFactory;
function random(min = 0, max = 2147483647) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=utils.js.map