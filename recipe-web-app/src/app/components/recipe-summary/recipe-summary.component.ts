import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from '../../model/recipe';
import {HighlightNewRecipeDirective} from '../../misc/highlight-new-recipe';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css']
})
export class RecipeSummaryComponent {

  @Input()
  recipe: Recipe;

  @Output()
  zoomIn: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  public zoomClicked(): void {
    this.zoomIn.emit(this.recipe.id);
  }
}
