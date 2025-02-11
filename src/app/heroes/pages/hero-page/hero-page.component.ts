import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){

  }

  volverAlListado(): void{
    this.router.navigate(['/heroes/list'])
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.params);esta forma no nos sirve

    //!Si queremos acceder a los datos del id en el que nos encontramos, debemos hacerlo de la segunda forma, ya que params es un Observable, y por tanto necesitamos suscribirnos para obtener el valor de forma asíncrona.
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe(hero => {
      if(!hero) return this.router.navigate(['/heroes/list']);
      this.hero = hero;
      console.log(hero);

      return;
    })
  }
}
