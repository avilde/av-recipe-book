import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test',
      'Test',
      'https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/21_Angular_logo_logos-512.png'
    ),
  ];

  public getRecipes() {
    return this.recipes.slice();
  }
}
