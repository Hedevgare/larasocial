<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Home/Index', [
            'posts' => Post::with('user:id,name')->latest()->get(),
            'suggested_follows' => User::inRandomOrder()->limit(3)->get(),
        ]);
    }
}
