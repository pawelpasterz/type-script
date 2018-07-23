import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  areRecipesLoaded = false;
  loadError = false;
  errorText: string;

  constructor(private router: Router,
              private service: RecipeService) {
  }

  ngOnInit(): void {
    this.service
      .getAllRecipes()
      .then((recipes) => {
        this.recipes = recipes;
        this.areRecipesLoaded = true;
      })
      .catch((error) => {
        this.loadError = true;
        this.errorText = error.message;
      });
  }

  public zoomInOnRecipe(id: number): void {
    this.router.navigateByUrl(`/recipes/${id}`);
  }
}
