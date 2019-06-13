<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    //
    public function upload(Request $request){
        return response()->json([
            'res' => $request->all()
        ]);
    }    

}
