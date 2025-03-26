"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_controller_1 = require("./controller/utils.controller");
const user_controller_1 = require("./controller/user.controller");
const token_middleware_1 = require("./middleware/token.middleware");
const game_controller_1 = require("./controller/game.controller");
const router = express_1.default.Router({ mergeParams: true });
router.get('/health_check', (0, express_async_handler_1.default)(utils_controller_1.healthCheck));
router.post('/register', (0, express_async_handler_1.default)(user_controller_1.register));
router.post('/login', (0, express_async_handler_1.default)(user_controller_1.login));
router.post('/game/start', token_middleware_1.tokenChecker, (0, express_async_handler_1.default)(game_controller_1.gameStart));
router.post('/game/end', token_middleware_1.tokenChecker, (0, express_async_handler_1.default)(game_controller_1.endGame));
exports.default = router;
//# sourceMappingURL=route.client.js.map