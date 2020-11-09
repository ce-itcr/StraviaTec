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
      var x = [];
      var y = [];
      var z = [];
      var desc1 = res['activity1']["duration"]+ " " + res['activity1']["s_time"]+ " " + res['activity1']["activity_date"] + " " + res['activity1']["mileage"] 
      var desc2 = res['activity2']["duration"] + " " +  res['activity2']["s_time"] + " " + res['activity2']["activity_date"] + " " + res['activity2']["mileage"] 
      var desc3 = res['activity3']["duration"] + " " + res['activity3']["s_time"] + " " + res['activity3']["activity_date"] + " " + res['activity3']["mileage"] 
      x.push(res['activity1']['activity_type'], desc1);
      y.push(res['activity2']['activity_type'], desc2);
      z.push(res['activity3']['activity_type'], desc3);
      this.activities.push(x,y,z);
      alert(this.activities)
      this.addToGroup(this.all)
    }, error => {
      alert("error")
    });
  }

  activities= [];
  userImage = "../../assets/img/default-avatar.png";
  userFullName = "Usuario por Defecto";
  username = "defaultuser"
  following = 232;
  followers = 555;
  activitiesList = [["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["cycling","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["walking","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["swimming","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"],
                    ["running","fecha: 04/11/2020, duracion: 0 hrs 59 mins 15 seg"]];
  activitiesLength = this.activitiesList.length;

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
    while(cont<this.activities.length){
      if(this.activities[cont][0] == sport || sport == this.all){
        var element = document.createElement("li");
        element.className = "list-group-item";
        element.appendChild(document.createTextNode(this.activities[cont][1]));
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
