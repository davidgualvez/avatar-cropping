<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Image;

class UploadController extends Controller
{
    //
    public function upload(Request $request){


        $image = $request->image;  // your base64 encoded
        $image = str_replace('data:image/jpeg;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = str_random(10).'.'.'jpeg';
        \File::put(storage_path(). '/' . $imageName, base64_decode($image));

        return response()->json([
            'res' => $request->all(),
            'success' => true
        ]);
    }    

}
