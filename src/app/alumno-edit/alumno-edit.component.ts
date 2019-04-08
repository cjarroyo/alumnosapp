import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../shared/alumnos/alumno.service';
import { Alumno } from '../shared/model/alumno';
import { NgForm } from '@angular/forms';
import { Curso } from '../shared/model/curso';
import { DatePipe } from '@angular/common';
import { CursoService } from '../shared/cursos/curso.service';

@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.component.html',
  styleUrls: ['./alumno-edit.component.css'],
})
export class AlumnoEditComponent implements OnInit {
  alumno: Alumno = new Alumno();
  cursosActivos: Curso[];
  cursosSeleccionados: number[];
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService,
    private cursoService: CursoService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.alumnoService.get(id).subscribe((alumno: Alumno) => {
          if (alumno) {
            this.alumno = alumno;
            this.cursosSeleccionados = this.getSelected(alumno.cursos);
            console.log(alumno);
            console.log(alumno.cursos);
            console.log(this.cursosSeleccionados);
            console.log(alumno.fechaNacimiento)
          } else {
            console.log(`ALumno with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });

    this.cursoService.getActives().subscribe((cursos: Curso[]) => {
      this.cursosActivos = cursos;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/alumno-list']);
  }

  save() {
    this.alumno.cursos = this.getSelectedCursos();
    this.alumnoService.save(this.alumno).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(id: number) {
    this.alumnoService.remove(id).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  private getSelected(cursos: Curso[]): number[] {
    if (cursos != null && cursos.length > 0) {
      return cursos.map(({ id }) => id);
    }
    return [];
  }


  private getSelectedCursos() {
    if (this.cursosSeleccionados != null && this.cursosSeleccionados.length > 0) {
      return this.cursosActivos.filter(curso => this.cursosSeleccionados.includes(curso.id));
    }
  }
}
