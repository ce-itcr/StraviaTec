import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'app/comunication.service';

@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent{
  constructor(private router: Router, private CS: ComunicationService) {}

  toLogin(){
    this.router.navigateByUrl('/login');
  }

  public image_path;
  imgURL: any;
  public message: string;

  previewImage(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.image_path = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  register(fName, lName, nationality, bDate, username, password, userType){
    var age = this.getUserAge(bDate.slice(0,-6));
    this.CS.sendRegisterData(fName,lName,nationality,bDate,age,username,password,userType).subscribe(res => {
      alert(res);
    }, error => {
      alert(error);
    });
  }

  getUserAge(birth_date_year){
    return (new Date()).getFullYear() - birth_date_year;
  }

}
