import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.pug',
  styleUrls: ['./shopping-edit.component.styl'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { name, amount } = form.value;
    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }
}
