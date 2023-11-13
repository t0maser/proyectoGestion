import { Injectable } from '@angular/core';
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: String;

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.url = Global.url;
  }

  ingresar(user: any) {
    return this._http.post<any>(this.url + '/ingresar', user);
  }
  ingresarAsesor(user: any) {
    return this._http.post<any>(this.url + '/ingresarA', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  tipoUsuario() {
    return localStorage.getItem('tipoUsuario');
  }
  regUser(user: any): Observable<any> {

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });

  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('nombre')
    localStorage.removeItem('tipoUsuario')
    localStorage.removeItem('correo')
    this.router.navigate(['/asesorias'])
    location.reload()
  }
}
