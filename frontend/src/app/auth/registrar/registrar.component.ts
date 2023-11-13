import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: [ './registrar.component.css'
  ],
  providers : [
    LoginService
  ]
})
export class RegistrarComponent {
  public status: boolean = false ;
  mensaje! : string ;
  loader : boolean = false
  public usuario = {
    nombre: '',
    correo: '',
    usuario: '',
    contrasena: '',
    numero: ''
  }
  constructor(
    private _ingresarService: LoginService,
    private router: Router
  ) { }

  signin() {

    
  }
  onSubmit(form: any){
    this.loader = true    
    this._ingresarService.regUser(this.usuario).subscribe(
      response => {
        this.loader = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Registrado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        }, )
        this.router.navigate(['/']);

      }, error => {
        this.loader = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal!'
          
        })
        console.log(error)
      }
    )
  }

  
}
