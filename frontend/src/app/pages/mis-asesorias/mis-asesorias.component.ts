import { Component } from '@angular/core';
import { AsesoriasService } from '../../services/asesorias.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-asesorias',
  templateUrl: './mis-asesorias.component.html',
  styles: [
  ],
  providers: [
    AsesoriasService
  ]
})
export class MisAsesoriasComponent {

  asesorias: any = 0
  herramientasAsesor: boolean = false
  usuario: boolean = false
  imgAsesor! : any
  nombreAsesor! : any

  constructor(
    private _asesoriaService: AsesoriasService
  ) {
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario == 'asesor') {
      let idAsesor = localStorage.getItem('id');
      this.herramientasAsesor = true
      this._asesoriaService.misAsesoriasAsesor(idAsesor).subscribe(
        response => {
          this.asesorias = response.resultados.recordsets[0]          
          this._asesoriaService.getAsesor(this.asesorias[0].id_asesor).subscribe(
            response => {
              this.imgAsesor = response.resultados.recordset[0].imagen
              this.nombreAsesor = response.resultados.recordset[0].nombre
            }
          )


        }, error => {
          console.log(error)
        }
      )
    }
    if (tipoUsuario == "normal") {
      this.usuario = true
      let idUsuario = localStorage.getItem('id');
      this._asesoriaService.misAsesoriasUsuario(idUsuario).subscribe(
        response => {
          this.asesorias = response.resultados.recordsets[0]
          for (let i = 0; i < this.asesorias.length; i++) {            
            this.asesorias[i].fechaA = this.formatearFecha(this.asesorias[i].fechaA)
            this._asesoriaService.getAsesor(this.asesorias[i].id_asesor).subscribe(
              response =>{
                this.asesorias[i].imagenAsesor = response.resultados.recordset[0].imagen
                this.asesorias[i].nombreAsesor = response.resultados.recordset[0].nombre              
              }
            )
          }
        },error =>{

        }
      )
    }
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
