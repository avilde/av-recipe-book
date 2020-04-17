import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'Super tasty burger',
      '../../assets/burger.png',
      [new Ingredient('Meat', 1), new Ingredient('Buns', 2)]
    ),
  ];

  public getRecipes() {
    return [...this.recipes];
  }
}
