<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //ログイン済みの場合
    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * 現在ログインしているユーザーIDを取得する
     * api/users
     * GET
     *
     * @return \App\User|null
     */
    public function index()
    {
        return Auth::id();
    }
    /**
     * api/users/{user_id}
     * GET
     */
    public function getTask($id)
    {
        if(Auth::id() == $id) {
            $user = User::find(Auth::id());
            $task = $user->task;
            return $task;
        }
    }
}
