import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule,
  MatToolbarModule, MatDatepickerModule, MatNativeDateModule,
  MatSidenavModule, MatIconModule, MatCheckboxModule,
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MatTableModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AlumnoListComponent } from './alumno-list/alumno-list.component';
import { AlumnoEditComponent } from './alumno-edit/alumno-edit.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CursoEditComponent } from './curso-edit/curso-edit.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    AlumnoListComponent,
    AlumnoEditComponent,
    HomeComponent,
    CursoEditComponent,
    CursoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }, //you can change useValue
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
