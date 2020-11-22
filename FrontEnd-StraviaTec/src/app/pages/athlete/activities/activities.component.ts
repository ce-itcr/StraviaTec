import { Component } from '@angular/core';
import { fileURLToPath } from 'url';
import * as $ from "jquery";
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'activities.component.html'
})

export class ActivitiesComponent{

  constructor(private CS: CommunicationService) {}

  public sendNewActivity(s_time, duration, a_type, date, URL, km){

    var username = localStorage.getItem('current_username')
    s_time+=":00";
    duration+=":00";

    //ENVÍA ACTIVIDAD AL SERVIDOR
    this.CS.sendNewActivity(username, s_time, duration, a_type, date, URL, km).subscribe(res => {
      alert(res);
    }, error => {
      alert("ERROR");
    });
  }

}
