import express from "express";
import asyncHandler from "express-async-handler";
import { healthCheck } from "./controller/utils.controller";
import { login, register } from "./controller/user.controller";
import { tokenChecker } from "./middleware/token.middleware";
import { endGame, gameStart } from "./controller/game.controller";

const router = express.Router({ mergeParams: true });

router.get('/health_check', asyncHandler(healthCheck));

router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))

router.post('/game/start', tokenChecker, asyncHandler(gameStart))
router.post('/game/end', tokenChecker, asyncHandler(endGame))

export default router;