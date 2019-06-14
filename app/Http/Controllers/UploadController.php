<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    //
    public function upload(Request $request){ 

        $image = $request->image;  // your base64 encoded
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = str_random(10).'.'.'png'; 
        Storage::put('public/avatar/'.$imageName,  base64_decode($image), 'public');

        return response()->json([
            'res'       => $request->all(),
            'success'   => true
        ]);
    }    

}
