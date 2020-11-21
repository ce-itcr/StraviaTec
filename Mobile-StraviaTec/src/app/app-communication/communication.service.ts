import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
    
    constructor(private http: HttpClient) { }

    // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
    public verifyUser(username: string, password: string){
     return this.http.post<JSON>("api/login", {"username": username, "password": password});
    }

    //SEND REGISTER ACTIVITY DATA
    public sendNewActivity(username, s_time,duration,a_type,date,URL, km){
        return this.http.post<JSON>("api/athlete/createactivity",{
        "username":username,
        "s_time":s_time,
        "duration":duration,
        "a_type":a_type,
        "date":date,
        "URL":URL,
        "km":km
        });
    }

      //GET ACTIVITIES LIST
  public getActivities(username){
    return this.http.post<JSON>("api/athlete/activity",{'username':username});
  }

    //GET FRIENDS ACTIVITIES LIST
    public getFriendsActivities(username){
      return this.http.post<JSON>("api/athlete/follows",{'username':username});
    }

}