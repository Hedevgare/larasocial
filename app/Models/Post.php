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
        'is_liked',
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

    public function isLiked() {
        return $this->likes()->where('user_id', auth()->user()->id)->exists();
    }
    
    public function getTotalCommentsAttribute() {
        return count($this->comments);
    }

    public function getTotalLikesAttribute() {
        return count($this->likes);
    }

    public function getIsLikedAttribute() {
        return $this->isLiked();
    }
}
