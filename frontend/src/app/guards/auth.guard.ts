import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private ingresar_service: LoginService,
    private router: Router) {

  }

  canActivate(): boolean {
    if (this.ingresar_service.loggedIn()) {
      return true;
    }
    this.router.navigate(['/']);

    return false;
  }

}
