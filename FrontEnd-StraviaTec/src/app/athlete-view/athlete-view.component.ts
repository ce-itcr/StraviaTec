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

  userImage = "../../assets/img/jonitho.jpg";
  userName = "JONITHO";
  following = 232;
  followers = 555;
  activities = 244;
  actual = "/athlete-view"
  activitiesList = ["Corrió la vuelta a Heredia","Nadó 100m en 3 minutos", "Pasó CA a la primera", "Se la comió bien doblada"]

  public searchAthlete(athleteName){
    alert(athleteName);
    this.router.navigateByUrl("/athlete-search");
  }

  public addToGroup(){
    alert("Mjm")
    var ul = document.getElementById("list");
    
    var cont = 0;
    while(cont<this.activitiesList.length){
      var li = document.createElement("li");
      li.className = "list-group-item";
      li.appendChild(document.createTextNode(this.activitiesList[cont]));
      ul.appendChild(li);
      cont++;
    }
    
  }

}
