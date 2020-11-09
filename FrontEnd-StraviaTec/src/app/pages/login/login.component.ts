import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'app/comunication.service';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{

  constructor(private router: Router, private CS: ComunicationService) {}

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

  verifyLogin(username, password){
    localStorage.setItem('username', username);
    this.CS.verifyUser(username,password).subscribe(
      res => {
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        alert("Nombre de usuario o contraseña incorrectos");
      }
      );;
  }

  public goToRegister(){
    this.router.navigateByUrl('/register');
  }
}
