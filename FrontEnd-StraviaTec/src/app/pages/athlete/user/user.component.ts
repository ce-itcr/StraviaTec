import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})


export class UserComponent implements OnInit{

  constructor(private router:Router, private modal:NgbModal, private CS: CommunicationService){}

  
  //FILL DE DISTINTOS COMPONENTES
  ngOnInit(): void{
    var username = localStorage.getItem('current_username');
    this.activities = [];
    this.races_table_content = [];
    this.challenges_table_content = [];

    //SE POLULAN LAS TABLAS DE ACTIVIDADES DEL USUARIO
    this.CS.getActivities(username).subscribe(res => {

      var cont = 1

      while(cont < res["size"]){
        var data = []
        var activity = "activity" + cont.toString();
        var key = res[activity]['activity_type']
        var desc = "||Duración: " + res[activity]["duration"]+ "||" + " ||Hora de inicio: " + res[activity]["s_time"]+ "||" +" ||Hora de finalización: " + this.calculateEndTime(res[activity]["s_time"],res[activity]["duration"]) + "||" + " ||Fecha de la actividad: " + res[activity]["activity_date"].slice(0,10) + "||" + " ||Distancia recorrida: " + res[activity]["mileage"]+"||";
        data.push(key,desc)
        this.activities.push(data);
        cont++;
      }

      //SE PEGAN LOS DATOS PRINCIPALES DEL USUARIO
      this.img_url = res['img_url'];
      this.following = res['following'];
      this.followers = res['followers'];
      localStorage.setItem("following" ,this.following)
      this.fName = res['fName'];
      this.lName = res['lName'];
      this.birthDate = (res['birthDate']).slice(0,10);
      this.nationality = res['nationality'];
      this.userPassword = localStorage.getItem('current_password');
      this.activitiesLength = (res["size"]-1);
      this.addToGroup(this.all);

      //SE POPULA LA TABLA DE CARRERAS
      this.CS.getMyRaces(username).subscribe(res => {
        var cont = 1;
        while(cont < res['size_race']){
          var key = "race" + cont.toString();
          var list = [];
          var raceName = "Nombre de la carrera: " + res[key]['race_name'];
          var raceDate = "Fecha de la carrera: " + res[key]['race_date'].slice(0,10);
          var raceType = "Tipo de la carrera: " + res[key]['race_type'] ;
          var raceVisibility = "Privacidad de la carrera: " + res[key]['visibility'];
          list.push(raceName, raceDate, raceType, raceVisibility);
          this.races_table_content.push(list);
          cont++;
        }
        cont = 1;
        //SE POPULA LA TABLA DE RETOS
        while(cont < res['size_challenge']){
          var key = "challenge" + cont.toString();
          var list = [];
          var chaName = "Nombre de la reto: " + res[key]['cha_name'];
          var chaType = "Tipo de la reto: " + res[key]['cha_type'];
          var chaVisibility = "Privacidad de la reto: " + res[key]['visibility'];
          var period = "Periodo de reto: " + res[key]['t_period'].slice(0,10);
          list.push(chaName, chaType, period, chaVisibility);
          this.challenges_table_content.push(list);
          cont++;
        }
      }, error => {
        alert("ERROR");
      });

    }, error => {
      alert("error")
    });
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

  
  activitiesLength = 0;

  img_url;
  following;
  followers;
  fName;
  lName;
  birthDate;
  nationality;
  userPassword;
  userName = localStorage.getItem('current_username');

  user = [["John","Doe Smith","2020-11-09","CR","../../assets/img/default-avatar.png","johndoe","johndoepass"]]

  activities = [];
  races_table_content = [];
  challenges_table_content = [];

  public imagePath;
  imgURL: any;
  public message: string;

  
  running = "running";
  cycling = "cycling";
  swimming = "swimming"
  walking = "walking";
  kayaking = "kayaking";
  all = "master";

  //SE AÑADEN LOS ÍCONOS A LA INTERFAZ
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

  //SE FILTRAN LAS ACTIVIDADES REALIZADAS POR DEPORTE
  public addToGroup(sport){
    var htmlList = document.getElementById("list");
    var newList = document.createElement("newList");
    newList.className = "list-group";
    newList.id = "list";

    var cont = 0;
    
    while(cont<this.activities.length){
      if(this.activities[cont][0] == sport || sport == this.all){
        var element = document.createElement("li");
        element.className = "list-group-item";
        element.appendChild(document.createTextNode(this.activities[cont][1]));
        newList.appendChild(element);
      }
      cont++;
    }
    htmlList.replaceWith(newList);
  }

   //SE ENVÍAN DATOS ACTUALIZADOS DE USUARIO
  public updateData(fname, lname, nationality, bDate, pass, url){
    var imgUrl;
    if(url==""){
      imgUrl = this.img_url;
    }else{
      imgUrl = "../../assets/img/faces/";
      imgUrl = imgUrl + url.slice(12);
    }
    var user = localStorage.getItem('current_username');
    var age = 21; 
    this.CS.sendDataToUpdate(fname, lname, nationality, bDate, age, user, pass, imgUrl).subscribe(
      res => {
        this.ngOnInit();
        alert("Se han actualizado sus datos");
      }, error => {
        alert("Error al actualizar sus datos");
      }
    );
  }

  //SE CALCULA LA HORA DE FINALIZACIÓN MEDIANTE LA SUMA DEL TIEMPO INICIAL Y LA DURACIÓN
  calculateEndTime(s_time, duration){

    var hTime = Number(s_time.slice(0,2)) + Number(duration.slice(0,2));
    var mTime = Number(s_time.slice(3,5)) + Number(duration.slice(3,5));

    if(mTime>60){
      hTime += 1;
      mTime -= 60;
    }

    var hEnd = hTime.toString();
    var mEnd = mTime.toString();

    if(hEnd.length == 1){
      hEnd = "0" + hEnd;
    }
    if(mEnd.length == 1){
      mEnd = "0" + mEnd;
    }

    var endTime = hEnd + ":" + mEnd + ":00";

    return endTime;
  }

}
