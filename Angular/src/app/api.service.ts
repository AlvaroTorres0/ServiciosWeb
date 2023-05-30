import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url;

  constructor(private _http:HttpClient) {
    this.url = "http://localhost:3000";
  }

  mostrarMensaje(){
    console.log("Consumiendo la API");
  }

  consultaUsuario = () =>{
    let url = `${this.url}/obtener/datos/usuarios`;
    return this._http.get(url);
  }

  consultaUsuarioIndividual = (id:any) =>{
    let url = `${this.url}/obtener/datos/usuarios/${id}`;
    return this._http.get(url);
  }

  agregarUsuario = (body:any) =>{
    let url = `${this.url}/new/user`;
    return this._http.post(url,body);
  }

  actualizarUsuario = (body:any, id:any) =>{
    let url = `${this.url}/update/registro/${id}`;
    return this._http.put(url,body);
  }

  eliminarUsuario = (id: any) =>{
    let url = `${this.url}/delete/registro/${id}`;
    return this._http.delete(url);
  }
}