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

  ngOnInit(): void{
    this.CS.getActivities(localStorage.getItem('current_username')).subscribe(res => {
      var cont = 1
      while(cont < res["size"]){
        var data = []
        var activity = "activity" + cont.toString();
        var key = res[activity]['activity_type']
        var desc = res[activity]["duration"]+ " " + res[activity]["s_time"]+ " " + res[activity]["activity_date"] + " " + res[activity]["mileage"];
        data.push(key,desc)
        this.activities.push(data);
        cont++;
      }
      this.activitiesLength = (res["size"]-1);
      this.addToGroup(this.all);
    }, error => {
      alert("error")
    });
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

  activities = [];
  activitiesLength = 0;
  following = 232;
  followers = 555;
  running = "running";
  cycling = "cycling";
  swimming = "swimming"
  walking = "walking";
  kayaking = "kayaking";
  all = "master";



  user = [["John","Doe Smith","2020-11-09","CR","../../assets/img/default-avatar.png","johndoe","johndoepass"]]

  races_table_titles = [
    ["Nombre de la Carrera","Fecha de la Carrera","Tipo de Actividad","Privacidad","Categorías"],
  ]
  races_table_content = [
    ["Carrera La Candelaria", "24/12/2020","Atletismo","Público","Elite, Master A"],
    ["Vuelta al Lago", "24/12/2021","Ciclismo","Público","Junior,Elite, Master A"]
  ]

  challenges_table_titles = [
    ["Nombrel Reto","Objetivo","Avance","Días para terminar el reto"],
  ]
  challenges_table_content = [
    ["Cartago se mueve", "Bajar de peso","50%","20 días"],
    ["Cartago se mueve", "Bajar de peso","50%","20 días"]
  ]


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



  //ENVÍ0 DE DATOS DE ACTUALIZACIÓN DE USUSARIO A "COMMUNICATION SERVICE"
  updateUserData(fname, lname, birth_date, nacionality, file, username, password){
    alert(fname);
    //this.CS.updateUserData(fname, lname, birth_date, nacionality, file, username, password);
  }


}
