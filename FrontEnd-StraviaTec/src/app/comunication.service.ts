import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  constructor(private http: HttpClient) { }

 // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
  public verifyUser(username: string, password: string){
   return this.http.post<JSON>("api/login", {"username": username, "password": password});
  }

 //GET ACTIVITIES LIST
 public getActivities(username){
   return this.http.post<JSON>("api/athlete/activity",{'username':username});
 }

 //SEND REGISTER DATA
 public sendRegisterData(fname, lname, nationality, bDate, age, user, pass, athlete){
  return this.http.post<JSON>("api/Register",{
    "fName":fname,
    "lName":lname,
    "nationality":nationality,
    "bDate":bDate,
    "age":age,
    "username":user,
    "password":pass,
    "userType":athlete
     });
  } 

}
