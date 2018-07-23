import {Injectable} from '@angular/core';
import {Recipe} from '../model/recipe';
import {HttpClient} from '@angular/common/http';

const RECIPE_SERVER_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {
  }

  private static handleError(error: any): any {
    return Promise.reject(error.error || error);
  }

  public getAllRecipes(): Promise<Recipe[]> {
    return this.http
      .get(`${RECIPE_SERVER_URL}/v1/recipes.json`)
      .toPromise()
      .then(this.delay) // artificial delay
      .then((response: RecipeListResponse) => response.data as Recipe[])
      .catch(RecipeService.handleError);
  }

  public getRecipeById(id: number): Promise<Recipe> {
    return this.http
      .get(`${RECIPE_SERVER_URL}/v1/recipes/${id}.json`)
      .toPromise()
      .then(this.delay) // artificial delay
      .then((response: RecipeResponse) => response.data as Recipe)
      .catch(RecipeService.handleError);
  }

  public addRecipe(recipe: Recipe, photos: Photos): Promise<Recipe> {
    return this.http
      .put(`${RECIPE_SERVER_URL}/v1/recipes.json`, recipe)
      .toPromise()
      .then((response: RecipeResponse) => {
        const finalRecipe: Recipe = response.data as Recipe;
        const formData: FormData = new FormData();

        if (photos['coverPhoto']) {
          const file: File = photos.coverPhoto;
          formData.append('cover_photo', file, file.name);
        }

        if (photos['instructionPhotos']) {
          for (let i = 0; i < photos.instructionPhotos.length; i++) {
            if (photos.instructionPhotos[i]) {
              const filePhoto: File = photos.instructionPhotos[i];
              formData.append(`preparation_photos_${i}`, filePhoto, filePhoto.name);
            }
          }
        }

        return this.http.post(
          `${RECIPE_SERVER_URL}/v1/recipes/${finalRecipe.id}/images`, formData)
          .toPromise()
          .then(imageResponse => finalRecipe)
          .catch(RecipeService.handleError);
      })
      .catch(RecipeService.handleError);
  }

  // function mocks internet connection delay
  private delay(response: any): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  }
}

interface RecipeListResponse {
  error: {}[];
  data: {}[];
}

interface RecipeResponse {
  error: {};
  data: {};
}

interface Photos {
  coverPhoto: File;
  instructionPhotos: File[];
}
