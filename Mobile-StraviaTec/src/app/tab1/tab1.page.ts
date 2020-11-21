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

  constructor(public router:Router, private CS: CommunicationService, public alertController: AlertController,public toastController: ToastController, public db: DatabaseService) {}

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
    localStorage.setItem("s_time",s_time);
    localStorage.setItem("duration",duration);
    localStorage.setItem("a_type",a_type);
    localStorage.setItem("a_date",a_date);
    localStorage.setItem("URL_path",URL_path);
    localStorage.setItem("km",km);
    this.router.navigateByUrl('/tabs/tab2');

  }  

  public addActivity(s_time, duration, a_type, a_date, URL_path, km){
    s_time+=":00";
    duration+=":00";
    this.db.addAthleteActivity(localStorage.getItem("current_username"),s_time,duration,a_type,a_date,URL_path, km).then(_ => {
      this.makeToast('Actividad guardada localmente');
    })
  }

}
