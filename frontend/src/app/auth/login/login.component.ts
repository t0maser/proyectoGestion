import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {

  public status: boolean = false;
  mensaje!: string;
  loader : boolean = false
  usuario = {
    usuario: '',
    contrasena: ''
  }

  constructor(
    private _ingresarService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('correo');
    localStorage.removeItem('tipoUsuario');
  }

  signin() {
    this.loader = true
    this._ingresarService.ingresar(this.usuario)
      .subscribe(
        res => {
          this.loader = false
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.idUsuario);
          localStorage.setItem('nombre', res.nombre);
          localStorage.setItem('correo', res.correo);
          localStorage.setItem('tipoUsuario', 'normal');
          this.router.navigate(['/asesorias']);

        },
        err => {
          this._ingresarService.ingresarAsesor(this.usuario).subscribe(
            res => {
              this.loader= false
              localStorage.setItem('token', res.token);
              localStorage.setItem('id', res.idUsuario);
              localStorage.setItem('nombre', res.nombre);
              localStorage.setItem('tipoUsuario', 'asesor');
              this.router.navigate(['/asesorias']);
            }, err => {
              this.loader= false
              this.status = true;
              this.mensaje = err.error.message
            }
          )

        }
      )
  }
}
