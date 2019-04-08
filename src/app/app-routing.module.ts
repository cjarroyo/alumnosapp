import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoListComponent } from './alumno-list/alumno-list.component';
import { AlumnoEditComponent } from './alumno-edit/alumno-edit.component';
import { HomeComponent } from './home/home.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { CursoEditComponent } from './curso-edit/curso-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'alumno-list',
    component: AlumnoListComponent
  },
  {
    path: 'alumno-add',
    component: AlumnoEditComponent
  },
  {
    path: 'alumno-edit/:id',
    component: AlumnoEditComponent
  },
  {
    path: 'curso-list',
    component: CursoListComponent
  },
  {
    path: 'curso-add',
    component: CursoEditComponent
  },
  {
    path: 'curso-edit/:id',
    component: CursoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
