import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
  public verifyUser(username: string, password: string){
    return this.http.post<JSON>("api/login/consult", {"username": username, "password": password}).subscribe(
      res => {
        console.log("RES", res);
      },
      error => {
        alert("Nombre de usuario o contraseña incorrectos");
      }
      );
  }

}
