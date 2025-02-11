import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${ this.baseUrl }/heroes`)
  }

  //!indicamos además un pipe para poder capturar el error en caso de undefined, y tenemos que meterlo dentro de un “of()”, ya que la función devuelve un observable, y un undefined a secas no es un observable. Para convertir de forma rápida un valor en observable, tan sólo tenemos que utilizar un of():
  getHeroById(id: string): Observable<Hero|undefined>{
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(catchError(error => of(undefined)));
  }

}
