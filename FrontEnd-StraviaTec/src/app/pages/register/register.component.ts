import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent{
  constructor(private router: Router) {}

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

  register(first_name, last_name, birth_date, nacionality, username, password){
    var age = this.getUserAge(birth_date.slice(0,-6));
    alert(age);
    alert(this.imgURL);
  }

  getUserAge(birth_date_year){
    return (new Date()).getFullYear() - birth_date_year;
  }

}
