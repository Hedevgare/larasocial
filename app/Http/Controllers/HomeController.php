<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request) {
        $following = auth()->user()->following()->pluck('users.id')->toArray();
        array_push($following, auth()->id());

        $suggestions = DB::table('users')->whereNotIn('id', $following)->inRandomOrder()->limit(3)->get();

        return Inertia::render('Home/Index', [
            'posts' => Post::with('user:id,name')->latest()->get(),
            'suggested_follows' => $suggestions,
            'following' => $request->user()->following->makeHidden(['email', 'email_verified_at']),
        ]);
    }
}
