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
  flag = "0";

  //SE AÑADEN ÍCONOS E IMÁGENES PROPIAS DEL COMPONENTE
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

  //SE ENVÍA AL COMPONENTE DE LOG IN
  toLogin(){
    this.router.navigateByUrl('/login');
  }

  //COMPRUEBA LA VALIDEZ DE LOS DATOS INGRESADOS Y ENVÍA LOS DATOS INGRESADOS
  //RECIBE TODOS LOS DATOS EXIGIDOS EN LA INTERFAZ
  register(fName, lName, nationality, bDate, username, password, userType, imgUrl){
    var message = this.verifyData(fName, lName,username, password);
    if(this.flag == "1"){
      alert(message);
      this.flag = "0";
    }else{
      var url = "../../assets/img/faces/";
      if(imgUrl == ""){
        url = "../../assets/img/faces/default-avatar.png" 
      }else{
        url = url + imgUrl.slice(12);
      }
      var age = this.getUserAge(bDate.slice(0,-6));
      var category = this.setCategory(age);
        
        
      this.CS.sendRegisterData(fName,lName,nationality,bDate,age,username,password,userType, url, category).subscribe(res => {
          alert(res);
          this.router.navigateByUrl("/");
        }, error => {
          alert(error);
        });
    }
  }

  //SE CALCULA LA EDAD DEL USUARIO
  //RECIBE EL AÑO DE NACIMIENTO
  getUserAge(birth_date_year){
    return (new Date()).getFullYear() - birth_date_year;
  }

  //SE LE ASIGNA UNA CATEGORÍA AL USUARIO DEPENDIENDO DE SU EDAD
  //RECIBE LA EDAD DEL USUARIO
  setCategory(age){
    if(age >= 50){
      return "Master C";
    }else if(age >= 40){
      return "Master B";
    }else if(age >= 30){
      return "Master A";
    }else if(age >= 24){
      return "Open";
    }else if(age >= 15){
      return "Sub-23";
    }else{
      return "Junior";
    }
  }

  verifyData(fName, lName, username, password){
    var errorMessage = "Ingrese un valor válido de: ";
    if(fName == ""){
      errorMessage += "Nombre, ";
      this.flag = "1";
    }if(lName == ""){
      errorMessage += "Apellido, ";
      this.flag = "1";
    }if(username == ""){
      errorMessage += "Nombre de usuario, ";
      this.flag = "1";
    }if(password == ""){
      errorMessage += "Contraseña";
      this.flag = "1";
    }

    if(errorMessage.slice(-2,-1) == ","){
      errorMessage = errorMessage.slice(0,-2);
    }

    return errorMessage;
  }

}
