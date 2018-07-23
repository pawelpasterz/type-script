import { Component } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {

  recipeInProgress: Recipe;
  recipeForm: FormGroup;
  coverPhotoForViewing = '/assets/img/empty-bowl.jpg';
  instructionPhotosForViewing: string[];
  coverPhotoForUpload: File;
  instructionPhotosForUpload: File[];

  constructor(private service: RecipeService,
              private router: Router) {
    this.recipeInProgress = Recipe.createBlank();
    this.buildFormGroup();
    this.instructionPhotosForViewing = [];
    this.instructionPhotosForUpload = [];
  }

  private buildFormGroup(): void {
    const fg = {
      'title': new FormControl(
        this.recipeInProgress.title, [Validators.required]),
      'description': new FormControl(
        this.recipeInProgress.description, [Validators.required]),
      'preparation_time': new FormControl(
        this.recipeInProgress.preparation_time,
        [Validators.required, Validators.min(1)]
      ),
      'feeds_this_many': new FormControl(
        this.recipeInProgress.feeds_this_many,
        [Validators.required, Validators.min(1), Validators.max(1000)]
      ),
    };

    for (let i = 0; i < this.recipeInProgress.ingredients.length; i++) {
      fg[`ingredient_${i}`] = new FormControl(
        this.recipeInProgress.ingredients[i].ingredient, [Validators.required]);
      fg[`measure_${i}`] = new FormControl(
        this.recipeInProgress.ingredients[i].measure, [Validators.required]);
    }

    for (let i = 0; i < this.recipeInProgress.instructions.length; i++) {
      fg[`instruction_${i}`] = new FormControl(
        this.recipeInProgress.instructions[i].instruction,
        [Validators.required]
      );
    }

    this.recipeForm = new FormGroup(fg);
  }

  public addIngredient(): void {
    if (this.recipeInProgress.ingredients === null) {
      this.recipeInProgress.ingredients = [{ingredient: null, measure: null}];
    } else {
      this.recipeInProgress.ingredients.push({ingredient: null, measure: null});
    }

    this.buildFormGroup();
  }

  public removeIngredient(index): void {
    this.recipeInProgress.ingredients.splice(index, 1);
  }

  public addInstruction(): void {
    if (this.recipeInProgress.instructions === null) {
      this.recipeInProgress.instructions = [{instruction: null, photo: null}];
      this.instructionPhotosForViewing = [];
      this.instructionPhotosForUpload = [];
    } else {
      this.recipeInProgress.instructions.push({instruction: null, photo: null});
      this.instructionPhotosForViewing.push(null);
      this.instructionPhotosForUpload.push(null);
    }

    this.buildFormGroup();
  }

  public removeInstruction(index): void {
    this.recipeInProgress.instructions.splice(index, 1);
    this.instructionPhotosForViewing.splice(index, 1);
    this.instructionPhotosForUpload.splice(index, 1);
  }

  public addRecipe() {
    this.service.addRecipe(this.recipeInProgress, {
        coverPhoto: this.coverPhotoForUpload,
        instructionPhotos: this.instructionPhotosForUpload
      })
      .then((recipe) => {
        this.router.navigate(['recipes', recipe.id]);
      });
  }

  public readUrl(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (rdr) => {
        this.coverPhotoForViewing = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.coverPhotoForUpload = event.target.files[0];
    }
  }

  public readInstructionUrl(index: number, event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (rdr) => {
        this.instructionPhotosForViewing[index] = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.instructionPhotosForUpload[index] = event.target.files[0];
    }
  }
}
