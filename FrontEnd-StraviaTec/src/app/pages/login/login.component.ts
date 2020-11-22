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
  constructor(private router: Router, private CS:CommunicationService) {}

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
    localStorage.setItem("current_password",password);
    this.router.navigateByUrl('/dashboard');
  }

  verifyLogin(username, password){
    localStorage.setItem('current_username', username);
    localStorage.setItem("current_password", password);
    this.CS.verifyUser(username,password).subscribe(
      res => {
        if(res['userType'] == 'Athlete'){
          this.router.navigateByUrl('/dashboard');
        }
        else if(res['userType'] == 'Organizer'){
          this.CS.createReports().subscribe(res => {
            this.router.navigateByUrl('/race-management');
          });
        }
        else{
          alert(res);
        }

      },
      error => {
        alert("Nombre de usuario o contraseña incorrectos");
      }
      );;
  }
}
