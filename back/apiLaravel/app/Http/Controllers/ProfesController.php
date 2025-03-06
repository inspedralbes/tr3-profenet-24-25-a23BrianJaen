<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfesController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function getProfessors()
  {

    $professorsJson = [
      [
        "id" => 1,
        "nombre" => "Juan",
        "apellido" => "Pérez",
        "correo" => "juan.perez@moodle.com"
      ],
      [
        "id" => 2,
        "nombre" => "María",
        "apellido" => "Gómez",
        "correo" => "maria.gomez@moodle.com"
      ],
      [
        "id" => 3,
        "nombre" => "Carlos",
        "apellido" => "Rodríguez",
        "correo" => "carlos.rodriguez@moodle.com"
      ],
      [
        "id" => 4,
        "nombre" => "Ana",
        "apellido" => "Fernández",
        "correo" => "ana.fernandez@moodle.com"
      ],
      [
        "id" => 5,
        "nombre" => "Luis",
        "apellido" => "Martínez",
        "correo" => "luis.martinez@moodle.com"
      ]
    ];

    return response()->json($professorsJson);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
