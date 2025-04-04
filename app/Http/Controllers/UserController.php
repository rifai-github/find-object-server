<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MQTT;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = Auth::user()->load(['gamesAsPlayer', 'gamesAsOpponent']);

        $allGames = $user->gamesAsPlayer->merge($user->gamesAsOpponent);

        $highestLevels = Game::getHighestLevelsForUser($user->id);

        $user->makeHidden(['gamesAsPlayer', 'gamesAsOpponent']);

        return $this->responseSuccess('Berhasil mengambil user', [
            'user' => $user,
            'all_games' => $allGames,
            'highest_levels' => $highestLevels,
        ]);
    }
}
