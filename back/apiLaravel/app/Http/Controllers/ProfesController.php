<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfesController extends Controller
{
  /**
   * Display a listing of the resource.
   */


  private $teachersJson = [
    [
      "id" => 1,
      "name" => "Juan",
      "firstName" => "Pérez",
      "mail" => "juan.perez@moodle.com"
    ],
    [
      "id" => 2,
      "name" => "María",
      "firstName" => "Gómez",
      "mail" => "maria.gomez@moodle.com"
    ],
    [
      "id" => 3,
      "name" => "Carlos",
      "firstName" => "Rodríguez",
      "mail" => "carlos.rodriguez@moodle.com"
    ],
    [
      "id" => 4,
      "name" => "Ana",
      "firstName" => "Fernández",
      "mail" => "ana.fernandez@moodle.com"
    ],
    [
      "id" => 5,
      "name" => "Luis",
      "firstName" => "Martínez",
      "mail" => "luis.martinez@moodle.com"
    ]
  ];
  public function getTeachers()
  {

    return response()->json($this->teachersJson);
  }

  public function getTeachersById(string $id)
  {
    // Search the teacher by ID in the array
    $teacher = collect($this->teachersJson)->firstWhere('id', $id);

    // If not found the teacher, return error
    if (!$teacher) {
      return response()->json(['error' => 'Profesor no encontrado'], 404);
    }

    // Return teacher like JSON
    return response()->json($teacher, 200);
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
