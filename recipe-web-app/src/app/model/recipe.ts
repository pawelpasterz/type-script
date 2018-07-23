export interface Ingredient {
  ingredient: string;
  measure: string;
}

export interface Instruction {
  instruction: string;
  photo: string;
}

export class Recipe {

  id: number;
  title: string;
  description: string;
  feeds_this_many: number;
  preparation_time: number;
  instructions: Instruction[];
  ingredients: Ingredient[];
  cover_photo: string;
  keywords: string[];
  dateAdded: string;

  constructor(
    id: number,
    title: string,
    description: string,
    feeds_this_many: number,
    preparation_time: number,
    instructions: Instruction[],
    ingredients: Ingredient[],
    cover_photo: string,
    keywords: string[],
    dateAdded: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.feeds_this_many = feeds_this_many;
    this.preparation_time = preparation_time;
    this.instructions = instructions;
    this.ingredients = ingredients;
    this.cover_photo = cover_photo;
    this.keywords = keywords;
    this.dateAdded = dateAdded;
  }

  public static recipeFromJSON(json: any): Recipe {
    return new Recipe(
      json.id,
      json.title,
      json.description,
      json.feeds_this_many,
      json.preparation_time,
      json.instructions,
      json.ingredients,
      json.cover_photo,
      json.keywords,
      json.dateAdded
    );
  }

  public static createBlank(): Recipe {
    return new Recipe(-1, '', '', null, null, [], [], null, null, new Date().toString());
  }
}
