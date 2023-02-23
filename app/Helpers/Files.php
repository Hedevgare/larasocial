<?php

namespace App\Helpers;

class Files {
    public static function randomFile($directory) {
        $files = glob($directory . '/*.*');
        $file = array_rand($files);
        return $files[$file];
    }
}