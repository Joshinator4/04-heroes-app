import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{

  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService){}
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(resp=>{
      this.heroes = resp
      console.log(resp)
    })
  }


}
