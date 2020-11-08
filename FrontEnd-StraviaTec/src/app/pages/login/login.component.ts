import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent{
  constructor(private router: Router) {}

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
}
