'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Recipe } from '../../types';
import { getRecipe, deleteRecipe } from '../../lib/api';
import RecipeFormModal from '../../components/RecipeFormModal';

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    getRecipe(Number(params.id))
      .then(setRecipe)
      .catch(() => setError('Failed to load recipe'))
      .finally(() => setLoading(false));
  }, [params?.id]);

  async function handleDelete() {
    if (!recipe || !confirm('Delete this recipe?')) return;
    try {
      await deleteRecipe(recipe.id);
      router.push('/recipes');
    } catch {
      setError('Failed to delete recipe');
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-900"><p className="text-gray-400">Loading...</p></div>;
  if (error || !recipe) return <div className="flex min-h-screen items-center justify-center bg-gray-900"><p className="text-red-400">{error || 'Recipe not found'}</p></div>;

  const ingredientLines = recipe.ingredients.split('\n').filter(Boolean);
  const instructionLines = recipe.instructions.split('\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button onClick={() => router.push('/recipes')} className="mb-6 text-sm text-gray-400 hover:text-white transition-colors">
          &larr; Back to Recipes
        </button>

        <h1 className="text-3xl font-bold text-white">{recipe.title}</h1>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-orange-400">Ingredients</h2>
          <ul className="space-y-1.5">
            {ingredientLines.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-orange-400">Instructions</h2>
          <ol className="space-y-4">
            {instructionLines.map((line, i) => (
              <li key={i} className="flex gap-3 text-gray-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-900/50 text-sm font-medium text-orange-400">
                  {i + 1}
                </span>
                {line}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex gap-3 border-t border-gray-700 pt-6">
          <button onClick={() => setEditOpen(true)} className="rounded-lg bg-gray-700 px-5 py-2.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors">
            Edit
          </button>
          <button onClick={handleDelete} className="rounded-lg bg-red-900/50 px-5 py-2.5 text-sm text-red-400 hover:bg-red-800/50 transition-colors">
            Delete
          </button>
        </div>
      </div>

      <RecipeFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={() => {
          getRecipe(recipe.id).then(setRecipe).catch(() => {});
        }}
        recipe={recipe}
      />
    </div>
  );
}
