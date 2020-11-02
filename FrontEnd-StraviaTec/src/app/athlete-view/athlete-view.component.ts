import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.css']
})
export class AthleteViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  actual = "/athlete-view";

  userImage = "../../assets/img/jonitho.jpg";
  userName = "JONITHO";
  following = 232;
  followers = 555;
  activitiesList = ["Corrió la vuelta a Heredia","Nadó 100m en 3 minutos", "Pasó CA a la primera", "Se la comió bien doblada"];
  activities = this.activitiesList.length;

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

  public addToGroup(){
    var ul = document.getElementById("list");
    var cont = 0;
    while(cont<this.activitiesList.length && this.flag == 0){
      var li = document.createElement("li");
      li.className = "list-group-item";
      li.appendChild(document.createTextNode(this.activitiesList[cont]));
      ul.appendChild(li);
      cont++;
    }
    this.flag = 1;
  }

  public createCard(){

  }

}
