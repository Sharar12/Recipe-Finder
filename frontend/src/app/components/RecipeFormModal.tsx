'use client';

import { useState, useEffect } from 'react';
import type { Recipe } from '../types';
import { createRecipe, updateRecipe } from '../lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  recipe?: Recipe | null;
}

export default function RecipeFormModal({ open, onClose, onSaved, recipe }: Props) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    } else {
      setTitle('');
      setIngredients('');
      setInstructions('');
    }
  }, [recipe, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      setError('All fields are required');
      return;
    }
    try {
      setLoading(true);
      if (recipe) {
        await updateRecipe(recipe.id, { title: title.trim(), ingredients: ingredients.trim(), instructions: instructions.trim() });
      } else {
        await createRecipe({ title: title.trim(), ingredients: ingredients.trim(), instructions: instructions.trim() });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save recipe');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-5 text-xl font-bold text-white">{recipe ? 'Edit Recipe' : 'New Recipe'}</h2>
        <div className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe title" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-orange-500" />
          <div>
            <label className="mb-1 block text-xs text-gray-400">Ingredients (one per line)</label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs" rows={5} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-orange-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">Instructions</label>
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Step-by-step cooking instructions..." rows={6} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-orange-500" />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg bg-gray-700 py-2.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-orange-600 py-2.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : recipe ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
