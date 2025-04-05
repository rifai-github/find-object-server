<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function Illuminate\Log\log;

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
            ->where('user_id', $userId)
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
            'opponent_id' => null,
            'organ_id' => $organId,
            'level' => $level,
            'seed' => random_int(1, 999999),
            'player_win' => null,
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

    /**
     * Level tertinggi by user.
     */
    public static function getHighestLevelsForUser(int $userId)
    {
        // Ambil semua organ_id yang tersedia
        $allOrganIds = Organ::pluck('id');

        // Ambil game yang sudah selesai dan memenuhi aturan player_win
        $userLevels = self::whereNotNull('player_win')
            ->where(function ($query) use ($userId) {
                $query->where(function ($q) use ($userId) {
                    $q->where('user_id', $userId)
                      ->where('player_win', true); // Jika user adalah pemain utama, maka pemain utama harus menang
                })
                ->orWhere(function ($q) use ($userId) {
                    $q->where('opponent_id', $userId)
                      ->where('player_win', false); // Jika user adalah lawan, maka pemain utama harus kalah
                });
            })
            ->get()
            ->groupBy('organ_id')
            ->mapWithKeys(function ($games, $organId) {
                return [$organId => $games->max('level') ?? 0];
            });

        // Pastikan semua organ_id tetap muncul, kalau belum ada game-nya maka 0
        return $allOrganIds->mapWithKeys(function ($organId) use ($userLevels) {
            return [$organId => $userLevels[$organId] ?? 0];
        });
    }
}
