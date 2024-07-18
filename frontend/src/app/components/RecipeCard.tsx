'use client';

import Link from 'next/link';
import type { Recipe } from '../types';

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const preview = recipe.ingredients.split('\n').slice(0, 3).join(', ');

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block rounded-xl border border-gray-700 bg-gray-800 p-5 transition-colors hover:border-orange-600"
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
        {recipe.title}
      </h3>
      {preview && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-400">{preview}</p>
      )}
      <p className="mt-3 text-xs text-gray-500">
        {recipe.ingredients.split('\n').length} ingredients
      </p>
    </Link>
  );
}
