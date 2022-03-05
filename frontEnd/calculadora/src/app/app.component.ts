import { Component } from '@angular/core';
import { Datos } from './calculadora.models';
import {CalculadoraService} from './service/calculadora.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


constructor(
 private calculadoraService: CalculadoraService
){ }

  title = 'calculadora';

//inicializo los datos a enviar
datos: Datos={
  num1: -1,
  num2: -1,
  op: ""
};

operapendiente:boolean=false
escribirPantalla:string =""
pantallaConNumero:boolean=false
numPendiente:string =""
usarPunto:boolean=false
numEspera:string=''
solucion:string=''
contador:number=0

  ingresarnumero(num:number|string){
//concatena los numeros
   if(this.escribirPantalla.trim() == "" && this.operapendiente==false){
    this.numPendiente=num.toString()
    this.escribirPantalla=this.numPendiente

   }else if(this.escribirPantalla.trim() != "" && this.operapendiente==false){
    this.numPendiente=num.toString()
    this.escribirPantalla+=this.numPendiente
   }

   if(this.escribirPantalla.trim() != "" && this.operapendiente==true && this.contador==0 ){
     this.numEspera=num.toString();
     this.contador +=1
     this.escribirPantalla+=this.numEspera
   }else if(this.numEspera!='' && this.operapendiente==true && this.contador>0){
    this.numEspera+=num.toString()
this.escribirPantalla=this.escribirPantalla+num.toString()
  }

    console.log('numero1',this.datos.num1,'numero2',this.datos.num2)

  }

  ingresaroperacion( op: string){


      this.datos.op=op
this.operapendiente=true

       //asigno a num1 su valor
if (this.datos.num1 <0){
  //convierte els string a numero y lo guarda
  if(!isNaN(Number(this.escribirPantalla))){
    this.datos.num1 = Number(this.escribirPantalla);
  }

}
this.escribirPantalla+=op
  }

  limpiar(){
    this.operapendiente=false
    this.escribirPantalla =""
    this.pantallaConNumero=false
    this.numPendiente=""
    this.usarPunto=false
    this.numEspera=''
    this.solucion=''
    this.contador=0
this.escribirPantalla=''
this.datos.num1=-1
this.datos.num2=-1
this.datos.op=""
  }

  resultado(){
    this.datos.num2= Number(this.numEspera);
    console.log('numero1',this.datos.num1,'numero2',this.datos.num2)
    console.log(this.datos)
    this.calculadoraService.getResultado(this.datos).subscribe(
      {
        next: res => {

          console.log("resultado", res)
          this.limpiar()
          this.escribirPantalla=res.toString()

        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

}
