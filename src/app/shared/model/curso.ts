import { Alumno } from './alumno';

export class Curso {
    active: boolean;
    alumnos: Alumno[];
    anio: number;
    codigo: string;
    descripcion: string;
    id: number;
}