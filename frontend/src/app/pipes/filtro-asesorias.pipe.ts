import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAsesorias'
})
export class FiltroAsesoriasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length <3 ) return value
    const resultAsesorias = []
    for(const post of value){
      console.log(post)
      if(post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultAsesorias.push(post)
      }else if(post.nombreAsesor.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultAsesorias.push(post)
      }
    }
    return resultAsesorias
  }

}
