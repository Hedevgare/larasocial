<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Home/Index', [
            'posts' => auth()->user()->getFollowingsPosts(),
            'suggested_follows' => auth()->user()->getUsersToFollow(3),
            'following' => $request->user()->following->makeHidden(['email', 'email_verified_at']),
        ]);
    }
}
