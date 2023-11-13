export class Empleado {
    constructor(
        public id_empleado: number,
        public codigo: any,
        public nombre: string,
        public datos: string,
        public salario: number,
        public id_centro_costos: number,
        public alias: string,
        public labor: string,
        public fecha_chequeo : string

    ) { }
}