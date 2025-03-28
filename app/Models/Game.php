<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'opponent_id',
        'organ_id',
        'level',
        'time_second',
        'seed',
        'player_win',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function opponent()
    {
        return $this->belongsTo(User::class, 'opponent_id');
    }

    public function organ()
    {
        return $this->belongsTo(Organ::class);
    }

    /**
     * Cari game yang tersedia.
     */
    public static function findWaiting(int $userId, int $organId, int $level): ?self
    {
        return self::where('organ_id', $organId)
            ->where('level', $level)
            ->whereNull('opponent_id')
            ->where('user_id', '!=', $userId)
            ->first();
    }

    /**
     * Cari game yang tersedia tapi punya dia sendiri.
     */
    public static function findWaitingSelf(int $userId): ?self
    {
        return self::whereNull('opponent_id')
            ->where('user_id', '==', $userId)
            ->first();
    }

    /**
     * Perbarui game dengan opponent_id, time_second, dan player_win.
     */
    public function updateGame(array $data): self
    {
        $this->update([
            'opponent_id' => $data['opponent_id'] ?? $this->opponent_id,
            'time_second' => $data['time_second'] ?? $this->time_second,
            'player_win' => $data['player_win'] ?? $this->player_win,
        ]);
        return $this;
    }

    /**
     * Buat game baru.
     */
    public static function createGame(int $userId, int $organId, int $level): self
    {
        return self::create([
            'user_id' => $userId,
            'organ_id' => $organId,
            'level' => $level,
            'seed' => random_int(1, 999999),
            'time_second' => 0,
        ]);
    }

    /**
     * Ambil game berdasarkan ID.
     */
    public static function getGameById(int $id): ?self
    {
        return self::find($id);
    }
}
