import { Component, OnInit } from '@angular/core';
import { Curso } from '../shared/model/curso';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../shared/alumnos/alumno.service';
import { CursoService } from '../shared/cursos/curso.service';
import { Alumno } from '../shared/model/alumno';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.css']
})
export class CursoEditComponent implements OnInit {
  curso: Curso = new Curso();
  alumnos: Alumno[];
  allAlumnos: Alumno[];
  sub: Subscription;
  displayedColumns: string[] = ['id', 'nombres', 'fechaNacimiento', 'editar'];
  selectedAlumnoId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService,
    private alumnoService: AlumnoService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cursoService.get(id).subscribe((curso: Curso) => {
          if (curso) {
            this.curso = curso;
          } else {
            console.log(`Curso with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
        this.refreshAlumnoList(id);
        this.alumnoService.getAll().subscribe((alumnos: Alumno[]) => {
          this.allAlumnos = alumnos;
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/curso-list']);
  }

  save() {
    this.cursoService.save(this.curso).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(id: number) {
    this.cursoService.remove(id).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  addOrRemove(alumnoId: number, add: boolean) {
    if (alumnoId != null) {
      this.selectedAlumnoId = null;
      let method: Observable<Object> = add ? this.alumnoService.addCurso(alumnoId, this.curso.id) :
        this.alumnoService.removeCurso(alumnoId, this.curso.id);
      method.subscribe(result => {
        this.refreshAlumnoList(this.curso.id);
      }, error => console.error(error));
    }
  }

  refreshAlumnoList(cursoId: number) {
    this.alumnoService.getAllByCurso(cursoId).subscribe((alumnos: Alumno[]) => {
      this.alumnos = alumnos;
    });
  }
}
