import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alumno } from '../model/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  public ALUMNO_API: string = environment.api_url + '/alumno/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.ALUMNO_API);
  }

  getAllByCurso(cursoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.ALUMNO_API + "curso/" + cursoId);
  }

  get(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.ALUMNO_API + id);
  }

  save(alumno: Alumno): Observable<Alumno> {
    let result: Observable<Alumno>;
    if (alumno.id == null) {
      result = this.http.post<Alumno>(this.ALUMNO_API, alumno);
    } else {
      result = this.http.put<Alumno>(this.ALUMNO_API + alumno.id, alumno);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(this.ALUMNO_API + id);
  }

  removeCurso(alumnoId: number, cursoId: number) {
    return this.http.delete(this.ALUMNO_API + alumnoId + "/curso/" + cursoId);
  }

  addCurso(alumnoId: number, cursoId: number) {
    return this.http.post(this.ALUMNO_API + alumnoId + "/curso/" + cursoId, null);
  }
}
