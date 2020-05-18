import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService) {}

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
      new Ingredient('Cheese', 1)
    ]),
  ];

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public getRecipes() {
    return [...this.recipes];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
