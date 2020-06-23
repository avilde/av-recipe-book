import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.pug',
  styleUrls: ['./recipe-item.component.styl'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;
}
