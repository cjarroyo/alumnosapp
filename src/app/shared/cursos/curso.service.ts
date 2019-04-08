import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Curso } from '../model/curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService {
  public CURSO_API: string = environment.api_url + '/curso/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.CURSO_API);
  }

  getActives(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.CURSO_API + "active");
  }

  get(id: number): Observable<Curso> {
    return this.http.get<Curso>(this.CURSO_API + id);
  }

  save(Curso: Curso): Observable<Curso> {
    let result: Observable<Curso>;
    if (Curso.id == null) {
      result = this.http.post<Curso>(this.CURSO_API, Curso);
    } else {
      result = this.http.put<Curso>(this.CURSO_API + Curso.id, Curso);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(this.CURSO_API + id);
  }
}
