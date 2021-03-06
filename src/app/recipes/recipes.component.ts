import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.pug',
  styleUrls: ['./recipes.component.styl']
})
export class RecipesComponent {
  selectedRecipe: Recipe;
}
