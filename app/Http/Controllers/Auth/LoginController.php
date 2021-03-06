<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * 認証の試行を処理
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        $result = false;

        if (Auth::attempt($credentials)) {
            //sucess
            $request->session()->regenerate();
            $result = true;
            $user = Auth::user();
        }
        return response()->json(['result' => $result,'user' => $user]);
    }
}