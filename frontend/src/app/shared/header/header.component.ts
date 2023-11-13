import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',  
  providers : [
    LoginService
  ]
})
export class HeaderComponent implements OnInit {

  public panel : boolean = false  
  public iconUser : boolean = true

  constructor(
    private _ingresarService : LoginService
  ) { }

  ngOnInit(): void {
    if (this._ingresarService.loggedIn()) {
      this.panel = false
      this.iconUser = false
    }
    
  }
  logout(){
    this._ingresarService.logout()
  }
  mostrarPanel(){
    this.panel = true
  }
  quitarPanel(){
    this.panel = false
  }

}
