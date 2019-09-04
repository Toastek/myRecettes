import { Recipe } from "./../../models/recipe.model";
import { RecipesService } from "./../../services/recipes.service";
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController
} from "ionic-angular";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-edit-recipe",
  templateUrl: "edit-recipe.html"
})
export class EditRecipePage implements OnInit {
  mode = "Créer";
  difficultyOptions = ["Facile", "Moyenne", "Difficile"];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;
  get ingredientsForm() {
    return <FormArray>this.recipeForm.get("ingredients");
  }

  constructor(
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    if (this.mode == "Modifier") {
      this.recipe = this.navParams.get("recipe");
      this.index = this.navParams.get("index");
    }
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
    const formValue = this.recipeForm.value;
    let ingredients = [];
    if (formValue.ingredients.length > 0) {
      ingredients = formValue.ingredients.map(name => {
        return { name: name, amount: 1 };
      });
    }
    if (this.mode == "Modifier") {
      this.recipesService.updateRecipe(
        this.index,
        formValue.title,
        formValue.description,
        formValue.difficulty,
        ingredients
      );
    } else {
      this.recipesService.addRecipe(
        formValue.title,
        formValue.description,
        formValue.difficulty,
        ingredients
      );
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = "Moyenne";
    let ingredients = [];

    if (this.mode == "Modifier") {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl("Moyenne", Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: "Que voulez-vous faire?",
      buttons: [
        {
          text: "Ajouter un ingredient",
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: "Suppr. tous les ingredients",
          role: "destructive",
          handler: () => {
            const formArray: FormArray = <FormArray>(
              this.recipeForm.get("ingredients")
            );
            const len = formArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                formArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: "Ingredients supprimés !",
                duration: 1500,
                position: "bottom"
              });
              toast.present();
            }
          }
        },
        {
          text: "Annuler",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: "Ajouter un ingredient",
      inputs: [
        {
          name: "name",
          placeholder: "Nom de l'ingredient"
        }
      ],
      buttons: [
        {
          text: "Annuler",
          role: "cancel"
        },
        {
          text: "Ajouter",
          handler: data => {
            if (data.name.trim() == "" || data.name == null) {
              const toast = this.toastCtrl.create({
                message: "Veuillez saisir un nom valide",
                duration: 1500,
                position: "bottom"
              });
              toast.present();
              return false;
            }
            (<FormArray>this.recipeForm.get("ingredients")).push(
              new FormControl(data.name, Validators.required)
            );
            const toast = this.toastCtrl.create({
              message: "Ingredient ajouté !",
              duration: 1500,
              position: "bottom"
            });
            toast.present();
            return true;
          }
        }
      ]
    });
  }
}
