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
}
