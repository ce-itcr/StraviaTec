import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommunicationService } from './../../communication/communication.service';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
  constructor(private router: Router, private http: HttpClient) {}

  toRegister(){
    this.router.navigateByUrl('/register');
  }

  toAthleteLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['dashboard']));
  }

  toOrganizerLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['race-management']));
  }

  setLocalStorage(username, password){
    localStorage.clear();
    localStorage.setItem("current_username",username);
    this.router.navigateByUrl('/dashboard');
  }

  verifyLoginTest(username, password){
    return this.http.post<JSON>("api/Login",
    {"username": username, "password": password}).subscribe(res => {
      localStorage.clear();
      localStorage.setItem("current_username",username);
      console.log("RES", res);
      this.router.navigateByUrl('/dashboard');
     }, error => {
      alert("Nombre de usuario o contraseña incorrectos.");
    });
  }
}
