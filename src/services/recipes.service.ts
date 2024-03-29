import { Ingredient } from "./../models/ingredients.model";
import { Recipe } from "../models/recipe.model";
export class RecipesService {
  private recipes: Recipe[] = [];

  addRecipe(
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(
    index: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipes[index] = new Recipe(
      title,
      description,
      difficulty,
      ingredients
    );
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
