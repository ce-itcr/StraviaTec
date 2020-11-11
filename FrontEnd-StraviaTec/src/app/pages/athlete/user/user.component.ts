import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'app/comunication.service';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})


export class UserComponent implements OnInit{

  constructor(private router:Router, private CS: ComunicationService){}

  ngOnInit(): void{
    this.CS.getActivities(localStorage.getItem('username')).subscribe(res => {
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

  activitiesLength = 0;
  activities= [];
  userImage = "../../assets/img/default-avatar.png";
  userFullName = "Usuario por Defecto";
  username = "defaultuser"
  following = 232;
  followers = 555;

  phrase = "«Un hombre puede ser un ingrediente crucial para un equipo, pero un hombre no puede hacer un equipo.» Kareem Abdul-Jabbar.";

  running = "running";
  cycling = "cycling";
  swimming = "swimming"
  walking = "walking";
  all = "master";


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

  logout(){
    this.router.navigateByUrl("/");
  }

}
