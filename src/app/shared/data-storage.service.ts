import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { FIREBASE_STORAGE_URL, RECIPES_DB } from './constants';
import { AuthService } from '../auth/auth.service';
import { TEST_USER } from '../auth/constants';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    recipeService.recipesChanged.subscribe((recipes) => {
      if (this.authService.isTestUser) {
        console.info(
          `Logged in user is a test user (${TEST_USER}) - recipe changes will not be persisted`
        );
        return;
      }

      this.storeRecipes(recipes);
    });
  }

  storeRecipes(recipes: Recipe[]) {
    return this.http
      .put(`${FIREBASE_STORAGE_URL}/${RECIPES_DB}`, recipes)
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${FIREBASE_STORAGE_URL}/${RECIPES_DB}`)
      .pipe(
        map((recipes) => {
          if (!recipes) {
            return [];
          }

          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
