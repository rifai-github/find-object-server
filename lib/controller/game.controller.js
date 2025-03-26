"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameStart = gameStart;
exports.endGame = endGame;
const utils_1 = require("../helpers/utils");
const game_services_1 = require("../services/game.services");
const index_1 = require("../index");
const error = __importStar(require("../error"));
async function gameStart(req, res) {
    const organId = req.body.organ_id;
    const level = req.body.level;
    const waitingGame = await (0, game_services_1.findGame)(req.user, organId, level);
    if (waitingGame) {
        waitingGame.opponent_id = req.user.id;
        const join = await (0, game_services_1.updateGame)(waitingGame);
        index_1.io.emit(waitingGame.id.toString(), join);
        res.send(utils_1.ResponseFactory.success(join, 'Join Game successful!'));
        return;
    }
    const create = await (0, game_services_1.createGame)(req.user, organId, level);
    res.send(utils_1.ResponseFactory.success(create, 'Game Created!'));
}
async function endGame(req, res) {
    const gameId = req.body.game_id;
    const time = req.body.time;
    const hostWin = req.body.host_win;
    const game = await (0, game_services_1.getGameById)(gameId);
    if (!game) {
        throw new error.NotFoundError('Game Notfound!', 'endGame');
    }
    game.time_second = time;
    game.player_win = hostWin;
    const endGame = await (0, game_services_1.updateGame)(game);
    res.send(utils_1.ResponseFactory.success(endGame, 'Game Ended!'));
}
//# sourceMappingURL=game.controller.js.map