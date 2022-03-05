package main

import (
	"encoding/json"
	"fmt"       //para poder imprimir
	"io/ioutil" //leer la info que llega
	"math"
	"net/http" // para servidor

	//"log"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", homehandler)
	router.HandleFunc("/calcular", seeHandler).Methods("GET")
	router.HandleFunc("/calcular", addHandler).Methods("POST")
	//router.HandleFunc("/numero/{id}", getNumberhandler).Methods("GET")
	//router.HandleFunc("/numero/{id}", homehandler).Methods("POST")

	routes := cors.AllowAll().Handler(router) //para la politica de cors y que deje conectar con localhost

	//inicio el server
	err := http.ListenAndServe(":3000", routes)
	if err != nil {
		fmt.Println(err.Error())
	}

}

type calculos = []Calculo //array de calculos
var todoscalculos = calculos{
	{
		Num1: 1,
		Op:   "+",
		Num2: 15,
	},
}

type Calculo struct {
	Num1 float64
	Op   string
	Num2 float64
}

func homehandler(w http.ResponseWriter, r *http.Request) {

	w.Write([]byte("Welcome to my Calculator :)"))
}
func seeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") //content type es de tipo app/json
	json.NewEncoder(w).Encode(todoscalculos)

}
func addHandler(w http.ResponseWriter, r *http.Request) {
	var calculo Calculo

	reqBody, err := ioutil.ReadAll(r.Body) //guardo todo lo que llega en reqbody

	if err != nil {
		fmt.Fprintf(w, "insert valid operator")
	}
	json.Unmarshal(reqBody, &calculo) //asigno la info  que recibo a la variable calculo
	todoscalculos = append(todoscalculos, calculo)

	w.Header().Set("Content-Type", "application/json") //que tipo de dato envio
	//json.NewEncoder(w).Encode(&calculo)                //envio la info que recibi

	switch calculo.Op {
	case "+":
		resultado := (calculo.Num1 + calculo.Num2)
		json.NewEncoder(w).Encode(resultado)

	case "-":
		resultado := (calculo.Num1 - calculo.Num2)
		json.NewEncoder(w).Encode(resultado)

	case "*":
		resultado := (calculo.Num1 * calculo.Num2)
		json.NewEncoder(w).Encode(resultado)

	case "/":
		resultado := (calculo.Num1 / calculo.Num2)
		json.NewEncoder(w).Encode(resultado)
	case "**":
		resultado := potencia(calculo.Num1, calculo.Num2)
		json.NewEncoder(w).Encode(resultado)
	case "√":
		resultado := raiz(calculo.Num1)
		json.NewEncoder(w).Encode(resultado)
	default:
		json.NewEncoder(w).Encode(0)
	}

}

func potencia(num1 float64, num2 float64) (resultado float64) {

	resultado = math.Pow(num1, num2)
	return resultado
}
func raiz(num1 float64) (resultado float64) {

	resultado = math.Sqrt(num1)
	return resultado
}
