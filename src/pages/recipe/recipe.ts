import { RecipesService } from "./../../services/recipes.service";
import { ShoppingListService } from "./../../services/shopping-list.service";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { Recipe } from "../../models/recipe.model";
import { EditRecipePage } from "../edit-recipe/edit-recipe";

@IonicPage()
@Component({
  selector: "page-recipe",
  templateUrl: "recipe.html"
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private recipesService: RecipesService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get("recipe");
    this.index = this.navParams.get("index");
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: "Modifier",
      recipe: this.recipe,
      index: this.index
    });
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients);
    const toast = this.toastCtrl.create({
      message: "Ingredient(s) ajouté(s) à la liste de courses !",
      duration: 1500,
      position: "bottom"
    });
    toast.present();
  }
}
