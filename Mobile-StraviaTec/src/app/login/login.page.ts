import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../app-communication/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private CS:CommunicationService) { }

  ngOnInit() {
  }
  
  verifyLogin(username, password){
    localStorage.setItem('current_username', username);
    localStorage.setItem("current_password", password);
    this.CS.verifyUser(username,password).subscribe(
      res => {
        this.router.navigateByUrl('/tabs/tab1');
      },
      error => {
        alert("Nombre de usuario o contraseña incorrectos");
      }
      );;
    }
}
