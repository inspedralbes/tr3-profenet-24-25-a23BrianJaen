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
        "nombre" => "Matemáticas Avanzadas"
      ],
      [
        "id" => 102,
        "nombre" => "Historia del Arte"
      ],
      [
        "id" => 103,
        "nombre" => "Física Cuántica"
      ],
      [
        "id" => 104,
        "nombre" => "Literatura Universal"
      ],
      [
        "id" => 105,
        "nombre" => "Programación en JavaScript"
      ]
    ];

    return response()->json($classesJson);
  }
}
