import { Component } from '@angular/core';
import { CommunicationService } from '../app-communication/communication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private CS: CommunicationService) {}

  public sendNewActivity(s_time, duration, a_type, date, URL, km){

    var username = localStorage.getItem('current_username')
    s_time+=":00";
    duration+=":00";
    
    alert(username);
    alert(s_time);
    alert(duration);
    alert(a_type);
    alert(date);
    alert(URL);
    alert(km);

    this.CS.sendNewActivity(username, s_time, duration, a_type, date, URL, km).subscribe(res => {
      alert(res);
    }, error => {
      alert("ERROR");
    });
  }

}
