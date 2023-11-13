import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  login: boolean = false

  constructor() { 
    let idUsuario = localStorage.getItem('id');
    if(idUsuario){
      this.login = true
    }
  }

 

}
