'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Recipe } from '../types';
import { getRecipes } from '../lib/api';
import RecipeCard from '../components/RecipeCard';
import RecipeFormModal from '../components/RecipeFormModal';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRecipes({ search: search.trim() || undefined });
      setRecipes(data);
    } catch {} finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes, refreshKey]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-white">Recipes</h1>

        <div className="mb-8 flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes by title or ingredient..."
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-orange-500"
          />
          <button onClick={fetchRecipes} className="rounded-lg bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-700 transition-colors">Search</button>
          <button onClick={() => setModalOpen(true)} className="rounded-lg bg-gray-700 px-5 py-3 font-medium text-white hover:bg-gray-600 transition-colors">+ Add</button>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-400">Loading...</p>
        ) : recipes.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            {search.trim() ? 'No recipes match your search.' : 'No recipes yet. Add your first recipe!'}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        )}
      </div>

      <RecipeFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
