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
    this.addToGroupActivities(this.all);
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

  following = 232;
  followers = 555;
  running = "running";
  cycling = "cycling";
  swimming = "swimming"
  walking = "walking";
  kayaking = "kayaking";
  all = "master";

  activitiesList = [["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["walking","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: caminata de 1 hora"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: nado 4 horas"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: nado por la tard"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: mado por la noche durante 3 horas"],
                    ["kayaking","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: as"],
                    ["running","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: caminata por la mañana"]];
  activities = this.activitiesList.length;

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

  public addToGroupActivities(sport){
    var htmlList = document.getElementById("list");
    var newList = document.createElement("newList");
    newList.className = "list-group";
    newList.id = "list";

    var cont = 0;
    while(cont<this.activitiesList.length){
      if(this.activitiesList[cont][0] == sport || sport == this.all){
        var element = document.createElement("li");
        element.className = "list-group-item";
        element.appendChild(document.createTextNode(this.activitiesList[cont][1]));
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
