<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('opponent_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('organ_id')->constrained('organs')->onDelete('cascade');
            $table->bigInteger('level');
            $table->bigInteger('time_second');
            $table->bigInteger('seed');
            $table->boolean('player_win')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('games');
    }
};
