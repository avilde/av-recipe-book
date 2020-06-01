import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.pug',
  styleUrls: ['./recipes.component.styl']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  ngOnInit(): void {}
}
