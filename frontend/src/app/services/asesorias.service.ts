import { Injectable } from '@angular/core';
import { Global } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AsesoriasService {

  public url: String;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;

  }

  getAsesor(asesor: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url + '/asesor/'+asesor, { headers: headers });
  }

  misAsesoriasAsesor(idAsesor: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url + '/misAsesorias/'+idAsesor, { headers: headers });
  }

  misAsesoriasUsuario(idUsuario: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url + '/misAsesoriasUsuario/'+idUsuario, { headers: headers });
  }

  cerrarAsesoria(idAsesoria: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url + '/cerrarAsesoria/'+idAsesoria, { headers: headers });
  }
  usuariosEnAsesoria(idAsesoria: any,idAsesor : any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url + '/usuariosAsesoria/'+idAsesoria+'/'+idAsesor, { headers: headers });
  }

  registrarUserxAsesoria(data: any): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registraruserxasesoria', params, { headers: headers });

  }

  enviarCorreo(data: any): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'enviarCorreo', params, { headers: headers });

  }

  registrarAsesoria(asesoria: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registrarAsesoria', asesoria, { headers: headers });
  }

  asesorias(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'asesorias', { headers: headers });

  }


}
