import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.css',
              './../app.component.css']
})
export class AthleteViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.addToGroup(this.all);
  }

  actual = "/athlete-view";

  userImage = "../../assets/img/jonitho.jpg";
  userName = "JONITHO";
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

  cardsInfo = [["../../assets/img/jonitho.jpg", "JONITHO","Master of Bodoquitos 1"],
               ["../../assets/img/angelitho.jpg","ANGELITHO","Master of Trapeo 2"],
               ["../../assets/img/elPichudoVenegas.jpg","ANGUSTÍN","Master of Barrer 1"],
               ["../../assets/img/ivancito.jpg","IVANCITO","Master of Lavado de Platos 3"]]

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

}
