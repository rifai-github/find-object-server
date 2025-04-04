<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function unauthorized()
    {
        return $this->responseUnauthorized();
    }

    public function register(Request $request)
    {
        // Set validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // If validation fails
        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $checkEmail = User::getByEmail($request->email);
        if ($checkEmail) {
            return $this->responseError("Email yang dipakai sudah pernah digunakan", 422);
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);


        $token = $user->createToken(env('APP_KEY'))->accessToken;

        return $this->responseSuccess('Registration successful', [
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors());
        }

        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return $this->responseUnauthorized('email dan password tidak sesuai!');
        }

        if (Hash::check($request->password, $user->password)) {
            $token = $user->createToken(env('APP_KEY'))->accessToken;

            return $this->responseSuccess('Login successful', [
                'token' => $token
            ]);
        }

        return $this->responseUnauthorized('email dan password tidak sesuai!');
    }
}
