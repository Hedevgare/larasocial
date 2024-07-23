<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $appends = [
        'total_comments',
        'total_likes',
        'user_like',
    ];

    protected $fillable = [
        'message',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    /**
     * Check if the authenticated user liked the post
     * 
     * @return int|null
     */
    public function userLike() {
        $like = $this->likes()->where('user_id', auth()->user()->id)->first();
        return $like ? $like->id : null;
    }
    
    public function getTotalCommentsAttribute() {
        return count($this->comments);
    }

    public function getTotalLikesAttribute() {
        return count($this->likes);
    }

    /**
     * Get the user_like attribute
     * 
     * @return int|null
     */
    public function getUserLikeAttribute() {
        return $this->userLike();
    }
}
