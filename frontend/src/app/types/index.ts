export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRecipePayload {
  title: string;
  ingredients: string;
  instructions: string;
}

export interface UpdateRecipePayload {
  title?: string;
  ingredients?: string;
  instructions?: string;
}
