import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { error } from 'protractor';
import { CommunicationService } from '../app-communication/communication.service';
import { DatabaseService } from '../app-services/database.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private router:Router, private CS:CommunicationService, private sanitizer:DomSanitizer, public alertController: AlertController,public toastController: ToastController, private db:DatabaseService) {}
  
  ngOnInit(): void {
    this.mapURL = localStorage.getItem("URL_path");
  }

  mapURL = "";

  async makeToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'alerta-k',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  public addUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.mapURL);
  }

  public syncAthleteActivity(s_time, duration, a_type, date, URL, km){

    var username = localStorage.getItem('current_username')
    s_time+=":00";
    duration+=":00";
  }

  public syncActivities(){

    this.CS.sendNewActivity(localStorage.getItem("current_username"), localStorage.getItem("s_time"), localStorage.getItem("duration"),
                            localStorage.getItem("a_type"),localStorage.getItem("a_date"),localStorage.getItem("URL_path"),localStorage.getItem("km"))
                            .subscribe(res => {
                              this.makeToast('OK');
                            }, error => {
                              this.makeToast('Ocurrió un error al guardar los datos de una nueva actividad, porfavor intete más tarde');
                            });
    this.router.navigateByUrl('/tabs/tab1');

   /* this.CS.sendNewActivity(username, s_time, duration, a_type, date, URL, km).subscribe(res => {
      //alert(res);
      this.makeToast('OK');
    }, error => {
      this.makeToast('Ocurrió un error al guardar los datos de una nueva actividad, porfavor intete más tarde');
    });*/
  }

}
