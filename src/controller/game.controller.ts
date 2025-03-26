import { Response } from 'express';
import { ResponseFactory } from "../helpers/utils";
import { createGame, findGame, getGameById, updateGame } from '../services/game.services';
import { io } from '../index';
import * as error from '../error';

export async function gameStart(req: any, res: Response) {
    const organId = req.body.organ_id as number;
    const level = req.body.level as number;

    const waitingGame = await findGame(req.user, organId, level);
    if (waitingGame) {
        waitingGame.opponent_id = req.user.id;
        const join = await updateGame(waitingGame);
        io.emit(waitingGame.id.toString(), join);

        res.send(ResponseFactory.success(join, 'Join Game successful!'));
        return;
    }

    const create = await createGame(req.user, organId, level);
    res.send(ResponseFactory.success(create, 'Game Created!'));
}

export async function endGame(req: any, res: Response) {
    const gameId = req.body.game_id as number;
    const time = req.body.time as number;
    const hostWin = req.body.host_win as boolean;

    const game = await getGameById(gameId);
    if (!game) {
        throw new error.NotFoundError('Game Notfound!', 'endGame')
    }
    game.time_second = time;
    game.player_win = hostWin;
    
    const endGame = await updateGame(game);
    res.send(ResponseFactory.success(endGame, 'Game Ended!'));
}