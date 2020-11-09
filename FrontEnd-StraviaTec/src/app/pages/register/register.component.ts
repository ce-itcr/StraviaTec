import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls:['../login/login.component.css']
})

export class RegisterComponent{
  constructor(private router: Router) {}

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

  register(first_name, last_name, birth_date, nacionality, file_url, username, password){
    var age = this.getUserAge(birth_date.slice(0,-6));
    alert(age);
    alert(nacionality);
    alert(file_url);

  }

  getUserAge(birth_date_year){
    return (new Date()).getFullYear() - birth_date_year;
  }

}
