import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  areDetailsLoaded = false;
  loadError = false;
  errorText: string;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private service: RecipeService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const recipeId = parseInt(params.get('recipe_id'), 10);
      this.service
        .getRecipeById(recipeId)
        .then((recipe) => {
          this.recipe = recipe;
          this.areDetailsLoaded = true;
        })
        .catch((error) => {
          this.loadError = true;
          this.errorText = error.message;
        });
    });
  }

  goBack() {
    this.location.back();
  }
}
