import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls:['../login/login.component.css']
})

export class RegisterComponent{
  constructor(private router: Router, private CS:CommunicationService) {}

  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  toLogin(){
    this.router.navigateByUrl('/login');
  }

  register(fName, lName, nationality, bDate, username, password, userType, imgUrl){
    var url = "../../assets/img/faces/";
    url = url + imgUrl.slice(12);
    var age = this.getUserAge(bDate.slice(0,-6));
    this.CS.sendRegisterData(fName,lName,nationality,bDate,age,username,password,userType, url).subscribe(res => {
      alert(res);
      this.router.navigateByUrl("/");
    }, error => {
      alert(error);
    });
  }

  getUserAge(birth_date_year){
    return (new Date()).getFullYear() - birth_date_year;
  }

}
