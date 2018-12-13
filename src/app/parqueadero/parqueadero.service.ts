import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from './model/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ParqueaderoService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private httpClient:HttpClient) {   }
  listar(){
    return  this.httpClient.get('http://localhost:8080/parqueadero/buscarVehiculos').toPromise();
  }

  salida(placa:String){
    return  this.httpClient.post('http://localhost:8080/parqueadero/registroSalida/', placa, this.httpOptions).toPromise();
  }

  guardar(vehiculo:Vehiculo){
    return  this.httpClient.post<any>('http://localhost:8080/parqueadero/registroEntrada', vehiculo, this.httpOptions).toPromise();
  }

  obtenerTrm(){
    return this.httpClient.get('http://free.currencyconverterapi.com/api/v5/convert?q=USD_COP&compact=y').toPromise();
  }
}