import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  constructor(private router: Router, private sanitizer:DomSanitizer){}
  ngOnInit(): void{
    this.addToGroup(this.all);
  };


  testh1 = "ANGELO ORTIZ"
  userImage = "../../assets/img/default-avatar.png";
  userName = "JON";
  following = 232;
  followers = 555;
  activitiesList = [["cycling","Le dio una vuelta a Puntarenas"],["soccer","Hizo 3 goles"],
                    ["swimming","Nadó durante 4 horas"],["athletics","Corrió los 100 metros en 11 segundos"]];
  activities = this.activitiesList.length;

  athletics = "athletics";
  cycling = "cycling";
  swimming = "swimming"
  soccer = "soccer";
  all = "master";

  cardsInfo = [["../../assets/img/default-avatar.png", "Jonathan Esquivel","Ruta casa de Jonitho", "https://www.google.com/maps/d/embed?mid=1cQv-iSgDnNCLG_jrQyX5emwZZDzLbixd&hl=es-419","Atletismo","12:50:00","13:50:00","04/11/2020","137bpm","30.1km","22.1km/h","1.4hours","Ciclismo por la mañana" ],
               ["../../assets/img/default-avatar.png","Angelo Ortiz","Ruta Cartaguito Campeón", "https://www.google.com/maps/d/embed?mid=1NtxatBwsDRZ0b_VZmAQGdFWSSE233Y3Q&hl=es-419","Ciclismo","12:50:00","13:50:00","04/11/2020","137bpm","30.1km","22.1km/h","1.4hours","Ciclismo por la mañana"],
               ["../../assets/img/default-avatar.png","Agustín Venegas","Ruta JuanilamaCity", "https://www.google.com/maps/d/embed?mid=1yYaYMv79WhM6JXegD89GanNor-IPc-gi&hl=es-419","Atletismo","12:50:00","13:50:00","01/11/2020","137bpm","30.1km","22.1km/h","1.4hours","Ciclismo por la mañana" ],
               ["../../assets/img/default-avatar.png","Iván Solís","Ruta casa de Iván", "https://www.google.com/maps/d/embed?mid=18RcpszqRsKd-Gy4Q6N7PRl5eaPa1bzqL&hl=es-419","Caminata","12:50:00","13:50:00","04/11/2020","137bpm","30.1km","22.1km/h","1.4hours","Ciclismo por la mañana" ]]

  list = [0,1,2,3];
  x = this.list.toString();

  flag = 0;

  public searchAthlete(athleteName){
    alert(athleteName);
    this.router.navigateByUrl("/athlete-search");
  }

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

  public addUrl(actual){
    return this.sanitizer.bypassSecurityTrustResourceUrl(actual);
  }

}
