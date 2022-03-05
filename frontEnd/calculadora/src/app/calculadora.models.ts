//creo la estructura de los datos a enviar (objeto que utilizo)
export interface Datos{
  num1:number | string
  op: string
  num2: number| string

}
//la estructura de los datos que envia
export interface Retorno{
  error: string| null,
  datos:number |null,
  status: boolean,
  tag: string

}
