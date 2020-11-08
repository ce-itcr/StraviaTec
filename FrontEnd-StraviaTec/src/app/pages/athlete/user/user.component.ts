import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})


export class UserComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void{
    this.addToGroup(this.all)
  }


  userImage = "../../assets/img/default-avatar.png";
  userFullName = "Usuario por Defecto";
  username = "defaultuser"
  following = 232;
  followers = 555;
  activitiesList = [["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: ciclismo por la mañana"],
                    ["walking","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: caminata de 1 hora"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: nado 4 horas"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: nado por la tard"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: mado por la noche durante 3 horas"],
                    ["running","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg, descripción: caminata por la mañana"]];
  activities = this.activitiesList.length;

  phrase = "«Un hombre puede ser un ingrediente crucial para un equipo, pero un hombre no puede hacer un equipo.» Kareem Abdul-Jabbar.";

  running = "running";
  cycling = "cycling";
  swimming = "swimming"
  walking = "walking";
  all = "master";

  list = [0,1,2,3];
  x = this.list.toString();

  flag = 0;


  public addToGroup(sport){
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
    //alert(htmlList);
    htmlList.replaceWith(newList);
    //this.flag = 1;
  }

  logout(){
    this.router.navigateByUrl("/");
  }

}
