<<<<<<< HEAD
import { TabsPage } from './../pages/tabs/tabs';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { RecipesPage } from './../pages/recipes/recipes';
=======
>>>>>>> 3441dd7... Initial commit
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
<<<<<<< HEAD
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';

import { ShoppingListService } from './../services/shopping-list.service';
import { RecipesService } from '../services/recipes.service';
import { RecipePage } from '../pages/recipe/recipe';
=======
import { HomePage } from '../pages/home/home';
>>>>>>> 3441dd7... Initial commit

@NgModule({
  declarations: [
    MyApp,
<<<<<<< HEAD
    EditRecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    RecipePage
=======
    HomePage
>>>>>>> 3441dd7... Initial commit
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    EditRecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    RecipePage
=======
    HomePage
>>>>>>> 3441dd7... Initial commit
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService
=======
    {provide: ErrorHandler, useClass: IonicErrorHandler}
>>>>>>> 3441dd7... Initial commit
  ]
})
export class AppModule {}
