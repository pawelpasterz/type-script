import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'swearingFilter'})
export class SwearingClass implements PipeTransform {

  _badWords = [
    'poop',
    'crap',
    'damn',
    'butt'
  ];

  transform(value: string, placeholder: string = '(ojej, brzydkie slowo)'): string {

    for (const badWord of this._badWords) {
      value = value.replace(badWord, placeholder);
    }
    return value;
  }
}
