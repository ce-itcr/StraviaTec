import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CommunicationService } from '../app-communication/communication.service';
import { AthleteActivity } from '../app-services/AthleteActivity';
import { DatabaseService } from '../app-services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private CS: CommunicationService, public alertController: AlertController,public toastController: ToastController) {}

  athleteActivity

  async makeToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'alerta-k',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public addAthleteActivity(s_time, duration, a_type, a_date, URL_path, km){
    s_time+=":00";
    duration+=":00";
    //this.db.addAthleteActivity(localStorage.getItem("current_username"),s_time,duration,a_type,a_date,URL_path, km).then(_ => {
    //  this.makeToast('Actividad guardada localmente');
    //})
  }

  public syncAthleteActivity(s_time, duration, a_type, date, URL, km){

    var username = localStorage.getItem('current_username')
    s_time+=":00";
    duration+=":00";

    /*this.db.getAthleteActivity();
    alert(this.db.getAthleteActivity());

    this.CS.sendNewActivity(username, s_time, duration, a_type, date, URL, km).subscribe(res => {
      //alert(res);
      this.makeToast('OK');
    }, error => {
      this.makeToast('Ocurrió un error al guardar los datos de una nueva actividad, porfavor intete más tarde');
    });*/
  }



  

}
