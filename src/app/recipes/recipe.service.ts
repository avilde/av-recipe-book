import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe('Burger', 'Super tasty burger', '../../assets/burger.png', [
      new Ingredient('Meat', 1),
      new Ingredient('Buns', 2),
      new Ingredient('Cheese', 1),
      new Ingredient('Lettuce', 1),
      new Ingredient('Onion', 1),
    ]),

    new Recipe('Burger', 'Cheeseburger', '../../assets/cheeseburger.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('Buns', 2),
      new Ingredient('Cheese', 1),
    ]),
  ];

  private triggerRecipeChanged() {
    this.recipesChanged.next(this.getRecipes());
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public getRecipes() {
    return [...this.recipes];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.triggerRecipeChanged();
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.triggerRecipeChanged();
  }

  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.triggerRecipeChanged();
  }
}
