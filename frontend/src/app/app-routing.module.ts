import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { AsesoriasComponent } from './pages/asesorias/asesorias.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AgregarAsesoriaComponent } from './pages/agregar-asesoria/agregar-asesoria.component';
import { MisAsesoriasComponent } from './pages/mis-asesorias/mis-asesorias.component';
import { DetalleAsesoriaComponent } from './pages/detalle-asesoria/detalle-asesoria.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'asesorias', component: AsesoriasComponent },   
      { path: 'detalleAsesoria/:idAsesoria', component: DetalleAsesoriaComponent ,canActivate: [AuthGuard]},   
      { path: 'agregarAsesoria', component: AgregarAsesoriaComponent ,canActivate: [AuthGuard]},
      { path: 'misAsesorias', component: MisAsesoriasComponent ,canActivate: [AuthGuard]},
      { path: '', redirectTo: '/asesorias', pathMatch: 'full' }
    ]

  },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: '**', component: NopagefoundComponent }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
