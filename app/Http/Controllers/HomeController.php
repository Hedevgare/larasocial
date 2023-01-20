<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,name')->latest()->get()
        ]);
    }
}
