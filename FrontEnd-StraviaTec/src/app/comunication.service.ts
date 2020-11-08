import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  constructor(private http: HttpClient) { }

 // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
 public verifyUser(username: string, password: string){
   alert(username + " " + password)
  return this.http.post<JSON>("api/login", {"username": username, "password": password}).subscribe(
    res => {
      console.log("RES", res);
    },
    error => {
      alert("Nombre de usuario o contraseña incorrectos");
    }
    );
}

}
