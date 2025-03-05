import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): User|undefined{
    if(!this.user){
      return undefined;
    }
    //return {...this.user} se puede hacer esto o (el spread(...) solo copia los atributos de primer nivel)

    return structuredClone(this.user) //structuredClone copia todos los niveles de los atributos del objeto
  }

  login(login: string, password: string): Observable<User>{

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'asfdafwsfsadfcsdfgedrgfdg.2342rtfdsf12'))
      )
  }

  logout(){
    this.user = undefined;
    localStorage.clear()
  }

}
