import {Directive, ElementRef, Renderer2, Input, Output, OnInit} from '@angular/core';
import {Recipe} from '../model/recipe';

@Directive({selector: '[appHighlightNewRecipe]'})
export class HighlightNewRecipeDirective implements OnInit {

  @Input('appHighlightNewRecipe')
  recipeToTes: Recipe;

  @Input('highlightRecipeColor')
  color: string;

  private factor = 1;

  constructor(private el: ElementRef, private render: Renderer2) {
    this.color = 'yellow';
  }

  ngOnInit(): void {
    const dateAdded = new Date(this.recipeToTes.dateAdded).getTime();
    if (new Date().getTime() - this.factor * 86400000 < dateAdded) {
      this.render.setStyle(this.el.nativeElement, 'background-color', this.color);
    }
  }
}
