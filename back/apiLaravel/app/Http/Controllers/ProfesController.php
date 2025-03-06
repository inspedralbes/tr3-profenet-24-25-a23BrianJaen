<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfesController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function getTeachers()
  {

    $teachersJson = [
      [
        "id" => 1,
        "name" => "Juan",
        "firstname" => "Pérez",
        "mail" => "juan.perez@moodle.com"
      ],
      [
        "id" => 2,
        "name" => "María",
        "firstname" => "Gómez",
        "mail" => "maria.gomez@moodle.com"
      ],
      [
        "id" => 3,
        "name" => "Carlos",
        "firstname" => "Rodríguez",
        "mail" => "carlos.rodriguez@moodle.com"
      ],
      [
        "id" => 4,
        "name" => "Ana",
        "firstname" => "Fernández",
        "mail" => "ana.fernandez@moodle.com"
      ],
      [
        "id" => 5,
        "name" => "Luis",
        "firstname" => "Martínez",
        "mail" => "luis.martinez@moodle.com"
      ]
    ];

    return response()->json($teachersJson);
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
