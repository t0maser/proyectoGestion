import { Component } from '@angular/core';
import { AsesoriasService } from '../../services/asesorias.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styles: [
  ],
  providers: [
    AsesoriasService
  ]
})
export class AsesoriasComponent {

  asesorias: any
  herramientasAsesor: boolean = false
  usuario: boolean = false
  filtroA = ''

  constructor(
    private _asesoriaService: AsesoriasService
  ) {
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario == 'asesor') {
      this.herramientasAsesor = true
    }
    if (tipoUsuario == "normal") {
      this.usuario = true
    }
    this._asesoriaService.asesorias().subscribe(
      response => {
        this.asesorias = response.resultados.recordsets[0]
        for (let i = 0; i < this.asesorias.length; i++) {
          this.asesorias[i].fechaA = this.formatearFecha(this.asesorias[i].fechaA)
          this._asesoriaService.getAsesor(this.asesorias[i].id_asesor).subscribe(
            response => {
              this.asesorias[i].imagenAsesor = response.resultados.recordset[0].imagen
              this.asesorias[i].nombreAsesor = response.resultados.recordset[0].nombre
            }
          )
        }
      }, error => {

      }
    )
  }

  inscribir(id_asesor: any, id_asesoria: any, fecha: any, nombre: any) {
    let data = {
      id_asesor: id_asesor,
      id_asesoria: id_asesoria,
      id_usuario: localStorage.getItem('id')
    }
    this._asesoriaService.registrarUserxAsesoria(data).subscribe(
      response => {
        let correo_usuario = localStorage.getItem('correo');
        let correo = {
          correoUsuario: correo_usuario,
          fecha: fecha,
          nombre: nombre
        }
        this._asesoriaService.enviarCorreo(correo).subscribe(
          response => {
            console.log(response)
          }, error => {
            console.log(error)
          }
        )
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registrado en la asesoria',
          showConfirmButton: false,
          timer: 1500
        })
        location.reload()
      }, error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })
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
    const fechaFormateada = `${day}/${month}/${year} ${hour}:${minutes}`;

    return fechaFormateada;
  }
}
