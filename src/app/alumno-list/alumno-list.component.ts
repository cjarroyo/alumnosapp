import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../shared/alumnos/alumno.service';
import { Alumno } from '../shared/model/alumno';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css'],
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[];
  displayedColumns: string[] = ['id', 'nombres', 'fechaNacimiento', 'editar'];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.getAll().subscribe(data => {
      this.alumnos = data;
    });
  }

}
