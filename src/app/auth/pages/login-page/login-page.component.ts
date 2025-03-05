import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {


  constructor(private authService: AuthService,
    private router: Router
  ){}
  onLogin(){
    this.authService.login('josh@gmail.com', 'hola1234')
      .subscribe(user => (
        this.router.navigate(['/']),
        console.log(user)
      ))
  }

}
