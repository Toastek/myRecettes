import { Ingredient } from "./../../models/ingredients.model";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "./../../services/shopping-list.service";

@IonicPage()
@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html"
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

  onRemoveItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }
}
