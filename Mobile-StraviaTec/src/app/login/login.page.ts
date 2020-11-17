import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CommunicationService } from '../app-communication/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private CS:CommunicationService,public alertController: AlertController,public toastController: ToastController) { }

  ngOnInit() {
  }

  async makeToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'alerta-k',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  verifyLogin(username, password){
    localStorage.setItem('current_username', username);
    localStorage.setItem("current_password", password);
    this.CS.verifyUser(username,password).subscribe(
      res => {
        this.router.navigateByUrl('/tabs/tab1');
        this.makeToast('Bienvenido a StraviaTEC');
      },
      error => {
        //alert("Nombre de usuario o contraseña incorrectos");
        this.makeToast('Nombre de usuario o contraseña incorrectos.');
      }
      );;
    }
}
