import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { FIREBASE_STORAGE_URL, RECIPES_DB } from './constants';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
    recipeService.recipesChanged.subscribe((recipes) => {
      this.storeRecipes(recipes);
    })
  }

  storeRecipes(recipes: Recipe[]) {
    return this.http.put(`${FIREBASE_STORAGE_URL}/${RECIPES_DB}`, recipes).subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${FIREBASE_STORAGE_URL}/${RECIPES_DB}`)
      .pipe(
        map(recipes => {
          if (!recipes) {
            return [];
          }
          
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
