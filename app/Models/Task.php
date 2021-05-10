<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';
    //カラムを追加する、可変項目
    protected $fillable = [
        'user_id','title','is_done',
    ];
    public function user() {
        return $this->belongsTo('App/Models/User');
    }
}
