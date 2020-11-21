import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommunicationService } from '../app-communication/communication.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private sanitizer: DomSanitizer, private CS: CommunicationService) { }

  ngOnInit(): void{

    this.CS.getFriendsActivities(localStorage.getItem('current_username')).subscribe(res => {

      var cont = 1

      while(cont < res["size"]){

        var data = []
        var activity = "activity" + cont.toString();

        var img = res[activity]["prof_img"];
        var name = res[activity]["f_name"] + " " + res[activity]["l_name"];
        var url = res[activity]["route"];
        var type = res[activity]["activity_type"];
        var start = res[activity]["s_time"];
        var date = res[activity]["activity_date"].slice(0,10);
        var distance = res[activity]["mileage"];
        var time = res[activity]["duration"];
        var end = this.calculateEndTime(start,time);

        data.push(img,name,url,type,start,end,date,distance,time);
        this.cardsInfo.push(data);
        cont++;
      }

    }, error => {
      alert("ERROR")
    });
  }

  cardsInfo = [];
  cards = [["../../assets/img/default-avatar.png", "Jonathan Esquivel", "https://www.google.com/maps/d/embed?mid=1cQv-iSgDnNCLG_jrQyX5emwZZDzLbixd&hl=es-419","Atletismo","12:50:00","13:50:00","04/11/2020","30.1km","1.4hours"],
               ["../../assets/img/default-avatar.png","Angelo Ortiz", "https://www.google.com/maps/d/embed?mid=1NtxatBwsDRZ0b_VZmAQGdFWSSE233Y3Q&hl=es-419","Ciclismo","12:50:00","13:50:00","04/11/2020","30.1km","1.4hours"],
               ["../../assets/img/default-avatar.png","Agustín Venegas", "https://www.google.com/maps/d/embed?mid=1yYaYMv79WhM6JXegD89GanNor-IPc-gi&hl=es-419","Atletismo","12:50:00","13:50:00","01/11/2020","30.1km","1.4hours"],
               ["../../assets/img/default-avatar.png","Iván Solís", "https://www.google.com/maps/d/embed?mid=18RcpszqRsKd-Gy4Q6N7PRl5eaPa1bzqL&hl=es-419","Caminata","12:50:00","13:50:00","04/11/2020","30.1km","1.4hours"]]

  public addUrl(actual){
    return this.sanitizer.bypassSecurityTrustResourceUrl(actual);
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
