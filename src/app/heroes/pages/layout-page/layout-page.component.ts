import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})

export class LayoutPageComponent {


  urlRaiz = 'heroes';
  public sidebarItems = [
    {label: 'Listado', icon: 'label', url:`${this.urlRaiz}/list`},
    {label: 'Añadir', icon: 'add', url:`${this.urlRaiz}/new-hero`},
    {label: 'Buscar', icon: 'search', url:`${this.urlRaiz}/search`}
  ]

  constructor(private authService: AuthService,
    private router: Router
  ){}

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

  get user(): User | undefined{
    return this.authService.getCurrentUser();
  }


}
