import { Component } from '@angular/core';
import { AsesoriasService } from '../../services/asesorias.service'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-asesoria',
  templateUrl: './detalle-asesoria.component.html',
  styles: [
  ],
  providers: [
    AsesoriasService
  ]
})
export class DetalleAsesoriaComponent {
  public usuarios : any = 0
  public idAsesoria! : any 

  constructor(
    private _asesoriaService: AsesoriasService,
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe(params => {
      this.idAsesoria = params.get('idAsesoria');
      let idAsesor = localStorage.getItem('id');
      this._asesoriaService.usuariosEnAsesoria(this.idAsesoria,idAsesor).subscribe(
        response => { 
          this.usuarios = response.resultados.recordsets[0]          
        },error => {
          console.log(error)
        }
      )
    });
    
  }
  cerrarAsesoria(idAsesoria : any){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Cerrar Asesoria!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._asesoriaService.cerrarAsesoria(idAsesoria).subscribe(
          response => {
            if(response){
              Swal.fire(
                'Cerrado!',
                'La asesoria ha sido cerrada exitosamente.',
                'success'
              )
              location.reload()
            }
          },error => {
            console.log(error)
          }
        )
        
      }
    })
  }


}
