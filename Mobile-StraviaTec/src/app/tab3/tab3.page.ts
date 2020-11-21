import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CommunicationService } from '../app-communication/communication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(private router: Router, private CS: CommunicationService, public alertController: AlertController,public toastController: ToastController) { }

  ngOnInit(): void {
    var username = localStorage.getItem("current_username");
    this.CS.getActivities(username).subscribe(res => {
      //alert(res);
      this.img_url = res['img_url'];
      //this.img_url = "../../assets/img/default-avatar.png"
      this.following = res['following'];
      this.followers = res['followers'];
      this.fName = res['fName'];
      this.lName = res['lName'];
      this.birthDate = (res['birthDate']).slice(0,10);
      this.nationality = res['nationality'];
      this.userPassword = localStorage.getItem('current_password');
      this.activitiesLength = (res["size"]-1);
    }, error => {
      alert("ERROR");
    })



  }

  img_url;
  following;
  followers;
  fName;
  lName;
  birthDate;
  nationality;
  userPassword;
  userName = localStorage.getItem('current_username');
  activitiesLength = 0;

  user = [["John","Doe Smith","2020-11-09","CR","../assets/img/default-avatar.png","johndoe","johndoepass"]]

  
  async makeToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'alerta-k',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  closeThis(){
    this.makeToast('Hasta pronto, gracias por usar StraviaTEC');
    localStorage.setItem("current_username","");
    this.router.navigateByUrl('/');
  }
  


}
