import { Injectable } from '@angular/core';
import{environment}from '../../environments/environment';//ruta de la api url
import{HttpClient} from '@angular/common/http';
import { Datos, Retorno } from '../calculadora.models';


@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  url:string =environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }


  getResultado(datos: Datos){
 return this.http.post<Retorno>(`${this.url}/calcular`, datos)
  }
}
