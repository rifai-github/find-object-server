<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UtilsController extends Controller
{
    // Register
    public function healthCheck(Request $request)
    {
        return $this->responseSuccess("API OK!!");
    }
}
