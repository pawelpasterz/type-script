import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeSummaryComponent} from './components/recipe-summary/recipe-summary.component';
import {RouterModule} from '@angular/router';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {RecipeService} from './services/recipe.service';
import {SwearingClass} from './misc/swearing.pipe';
import {HighlightNewRecipeDirective} from './misc/highlight-new-recipe';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeSummaryComponent,
    RecipeDetailsComponent,
    AddRecipeComponent,
    SwearingClass,
    HighlightNewRecipeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'recipes',
        component: RecipeListComponent,
      },
      {
        path: 'recipes/:recipe_id',
        component: RecipeDetailsComponent,
      },
      {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full',
      },
      {
        path: 'addrecipe',
        component: AddRecipeComponent,
      }
    ]),
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
