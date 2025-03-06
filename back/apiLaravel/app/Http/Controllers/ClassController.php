<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClassController extends Controller
{
  public function getClasses()
  {
    $classesJson = [
      [
        "id" => 101,
        "name" => "Matemáticas Avanzadas"
      ],
      [
        "id" => 102,
        "name" => "Historia del Arte"
      ],
      [
        "id" => 103,
        "name" => "Física Cuántica"
      ],
      [
        "id" => 104,
        "name" => "Literatura Universal"
      ],
      [
        "id" => 105,
        "name" => "Programación en JavaScript"
      ]
    ];

    return response()->json($classesJson);
  }
}
