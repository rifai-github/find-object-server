"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
const utils_1 = require("../helpers/utils");
async function healthCheck(req, res) {
    res.send(utils_1.ResponseFactory.success('API OK!'));
}
//# sourceMappingURL=utils.controller.js.map