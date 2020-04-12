import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.pug',
  styleUrls: ['./recipe-list.component.styl'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [new Recipe('Test', 'Test', 'Test')];

  constructor() {}

  ngOnInit(): void {}
}
