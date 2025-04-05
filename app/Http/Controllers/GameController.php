<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;
use PhpMqtt\Client\Facades\MQTT;

class GameController extends Controller
{
    public function startGame(Request $request)
    {
        $request->validate([
            'organ_id' => 'required|integer|exists:organs,id',
            'level' => 'required|integer',
        ]);

        $organId = $request->input('organ_id');
        $level = $request->input('level');
        $user = Auth::user();

        $waitingGame = Game::findWaiting($user->id, $organId, $level);

        if ($waitingGame) {
            $waitingGame->updateGame(['opponent_id' => $user->id]);

            $message = json_encode($waitingGame);
            $topic = 'organspedia';
            MQTT::publish($topic, $message);

            return $this->responseSuccess('Join Game successful!', $waitingGame);
        }

        $myGame = Game::findWaitingSelf($user->id);
        if ($myGame) {
            return $this->responseSuccess('Game Found!', $myGame);
        }

        $newGame = Game::createGame($user->id, $organId, $level);
        $newGame->makeVisible(['opponent_id', 'player_win']);
        return $this->responseCreated('Game Created!', $newGame);
    }

    public function endGame(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer',
            'time' => 'required|integer',
            'host_win' => 'required|boolean',
        ]);

        $gameId = $request->input('game_id');
        $time = $request->input('time');
        $hostWin = $request->input('host_win');

        $game = Game::getGameById($gameId);
        if (!$game) {
            return $this->responseNotFound('Game Not Found!');
        }

        // Update game dengan hasil akhir
        $game->updateGame([
            'time_second' => $time,
            'player_win' => $hostWin,
        ]);

        return $this->responseSuccess("Game Ended!", $game);
    }
}
