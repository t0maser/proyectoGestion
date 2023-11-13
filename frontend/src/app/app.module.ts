import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule , HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PagesComponent } from './pages/pages.component';
import { AsesoriasComponent } from './pages/asesorias/asesorias.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AsesoriaComponent } from './pages/asesoria/asesoria.component';
import { AgregarAsesoriaComponent } from './pages/agregar-asesoria/agregar-asesoria.component';
import { MisAsesoriasComponent } from './pages/mis-asesorias/mis-asesorias.component';
import { DetalleAsesoriaComponent } from './pages/detalle-asesoria/detalle-asesoria.component';
import { FiltroAsesoriasPipe } from './pipes/filtro-asesorias.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent, 
    PagesComponent,  
    AsesoriasComponent, RegistrarComponent, AsesoriaComponent, AgregarAsesoriaComponent, MisAsesoriasComponent, DetalleAsesoriaComponent, FiltroAsesoriasPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
