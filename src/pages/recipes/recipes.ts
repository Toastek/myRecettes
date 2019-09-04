import { RecipesService } from "./../../services/recipes.service";
import { Recipe } from "./../../models/recipe.model";
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { RecipePage } from "../recipe/recipe";

@IonicPage()
@Component({
  selector: "page-recipes",
  templateUrl: "recipes.html"
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService
  ) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: "Créer" });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }
}
