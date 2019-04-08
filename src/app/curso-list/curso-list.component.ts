import { Component, OnInit } from '@angular/core';
import { CursoService } from '../shared/cursos/curso.service';
import { Curso } from '../shared/model/curso';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos: Curso[];
  displayedColumns: string[] = ['id', 'codigo', 'descripcion', 'anio', 'activo', 'editar'];

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.cursoService.getAll().subscribe(data => {
      this.cursos = data;
    });
  }
}
