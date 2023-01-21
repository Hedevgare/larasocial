<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function follow(Request $request) {
        $userToFollow = User::find($request->user_id);
        auth()->user()->follow($userToFollow);

        return response()->noContent(200);
    }
}
