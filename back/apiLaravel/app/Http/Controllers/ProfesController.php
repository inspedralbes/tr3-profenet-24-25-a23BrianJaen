<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfesController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(string $id)
  {
    // Obtener profesores y sus departamentos
    $profesores = DB::connection('profenet')->select("
    SELECT 
    u.id AS" . $id . ", 
    u.firstname, 
    u.lastname, 
    u.email, 
    c.name AS department
    FROM 
        mdl_user u
    JOIN 
        mdl_role_assignments ra ON u.id = ra.userid
    JOIN 
        mdl_role r ON ra.roleid = r.id
    JOIN 
        mdl_context ctx ON ra.contextid = ctx.id
    JOIN 
        mdl_course co ON ctx.instanceid = co.id
    JOIN 
        mdl_course_categories c ON co.category = c.id
    WHERE 
        r.shortname = 'teacher'
    ORDER BY 
        c.name, u.lastname;
    ");
    dd($profesores);

    // $profesores = DB::connection('profenet')->select("
    // SELECT id 
    // FROM 
    //     mdl_user u;");

    return response()->json($profesores);
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
