<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        return Recipe::search($request->query('search'))
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
        ]);
        return Recipe::create($validated);
    }

    public function show(Recipe $recipe) { return $recipe; }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'ingredients' => 'sometimes|string',
            'instructions' => 'sometimes|string',
        ]);
        $recipe->update($validated);
        return $recipe;
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return response()->noContent();
    }
}
