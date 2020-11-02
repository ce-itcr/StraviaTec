import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../app.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    alert(this.image_path)
  }

  getUserAge(birth_date_year){
    return (new Date()).getFullYear() - birth_date_year;
  }

}
