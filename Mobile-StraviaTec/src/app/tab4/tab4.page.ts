import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../app-communication/communication.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private CS: CommunicationService) { }

  ngOnInit() {
    var username = localStorage.getItem("current_username");
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

      this.addToGroup(this.all);
      


    }, error => {
      alert("ERROR");
    })
  }

  activities = [];
  activitiesLength = 0;
  running = "running";
  cycling = "cycling";
  swimming = "swimming"
  walking = "walking";
  kayaking = "kayaking";
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
