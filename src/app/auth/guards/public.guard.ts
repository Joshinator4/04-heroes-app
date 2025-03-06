import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, of, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  return authService.checkAutentication()
    .pipe(
      tap(isAutentidcated => console.log('Autenticated:', isAutentidcated)),
      tap( isAutenticated => {
        if(isAutenticated){ //*Si esta autenticado navegamos al /heroes/list
          router.navigate(['/heroes/list'])
        }
      } ),
      //!Si no esta loggeado deseamos que se devuelva true para poder acceder a la ruta de /auth/login
      map(isAutenticated => !isAutenticated)//map: transformamos la salida,

    )
}

export const canActivateGuardPublic: CanActivateFn = ( //tipado CanActivate
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
)=>{
  console.log('CanActivatePublic');
  console.log({route, state})

  return checkAuthStatus();
}

export const canMatchGuardPublic: CanMatchFn = ( //tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
)=>{
  console.log('CanMatchPublic');
  console.log({route, segments})

  return checkAuthStatus();
}
