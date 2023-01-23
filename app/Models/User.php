<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function following() {
        return $this->belongsToMany(User::class, Follow::class, 'user_id', 'following_id');
    }

    public function isFollowing(User $user) {
        return $this->following()->where('users.id', $user->id)->exists();
    }

    public function follow(User $user) {
        if(!$this->isFollowing($user)) {
            Follow::create([
                'user_id' => auth()->id(),
                'following_id' => $user->id
            ]);
        }
    }

    public function getFollowingsPosts() {
        $feed = collect();

        foreach($this->following()->get() as $follow) {
            $posts = $follow->posts()->with('user:id,name')->get();
            $feed = $feed->merge($posts);
        }

        return $feed->sortByDesc('created_at')->values()->all();
    }

    public function getUsersToFollow($limit) {
        $alreadyFollowing = $this->following()->pluck('users.id')->toArray();

        array_push($alreadyFollowing, auth()->id());

        $usersToFollow = DB::table('users')->whereNotIn('id', $alreadyFollowing)->inRandomOrder()->limit($limit)->get();

        return $usersToFollow;
    }
}
