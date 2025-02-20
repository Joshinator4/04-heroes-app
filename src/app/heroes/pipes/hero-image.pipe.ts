import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interfaces';


//!Este pipe ha sido crado con ng g pipe heores/pipe/heroImage --flat --skip-tests

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_img){
      return `assets/no-image.png`
    }
    if (hero.alt_img) {
      return hero.alt_img;
    }
    return `assets/heroes/${hero.id}.jpg`;
  }


}
