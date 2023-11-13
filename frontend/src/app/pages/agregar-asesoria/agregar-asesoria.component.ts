import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AsesoriasService } from '../../services/asesorias.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-asesoria',
  templateUrl: './agregar-asesoria.component.html',
  providers: [
    AsesoriasService
  ]
})
export class AgregarAsesoriaComponent {

  loader : boolean = false
  public asesoria = {
    nombre: '',
    descripcion: '',
    valor: '',
    id_asesor: localStorage.getItem('id'),
    cupo: '',
    lugar: '',
    fecha: ''
  }

  constructor(
    private _asesoriasService : AsesoriasService,
    private router: Router
  ) { 
   
  }

  onSubmit(form : any){
    this.loader = true        
    this.asesoria.fecha = this.formatearFecha(this.asesoria.fecha)    
    this._asesoriasService.registrarAsesoria(this.asesoria).subscribe(
      response => {
        this.loader = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Asesoria Registrada Exitosamente',
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

  formatearFecha(fecha: string): string {
    // Dividir la fecha y hora en partes separadas
    const partes = fecha.split("T");
    const fechaParte = partes[0];
    const horaParte = partes[1];

    // Dividir la fecha en año, mes y día
    const fechaSplit = fechaParte.split("-");
    const year = fechaSplit[0];
    const month = fechaSplit[1];
    const day = fechaSplit[2];

    // Obtener la hora y los minutos
    const horaSplit = horaParte.split(":");
    const hour = horaSplit[0];
    const minutes = horaSplit[1];

    // Crear la fecha formateada (por ejemplo, DD/MM/YYYY HH:mm)
    //const fechaFormateada = `${day}/${month}/${year} ${hour}:${minutes}:00`;
    const fechaFormateada = `${year}/${month}/${day} ${hour}:${minutes}:00`;

    return fechaFormateada;
  }

}
