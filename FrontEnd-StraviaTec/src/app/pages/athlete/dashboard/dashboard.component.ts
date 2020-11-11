import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ComunicationService } from 'app/comunication.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  constructor(private router: Router, private sanitizer:DomSanitizer, private CS: ComunicationService){}
  ngOnInit(): void{
    this.CS.getFriendsActivities(localStorage.getItem('username')).subscribe(res => {

      var cont = 1

      while(cont < res["size"]){

        var data = []
        var activity = "activity" + cont.toString();

        var img = res[activity]["prof_img"];
        var name = res[activity]["f_name"] + " " + res[activity]["l_name"]
        var url = res[activity]["route"]
        var type = res[activity]["activity_type"]
        var start = res[activity]["s_time"]
        var end = "4:50"
        var date = res[activity]["activity_date"]
        var distance = res[activity]["mileage"]
        var time = res[activity]["duration"]

        data.push(img,name,url,type,start,end,date,distance,time)
        this.cardsInfo.push(data);
        cont++;
      }

    }, error => {
      alert("ERROR")
    });
  };

  cardsInfo = [];
  cards = [["../../assets/img/default-avatar.png", "Jonathan Esquivel", "https://www.google.com/maps/d/embed?mid=1cQv-iSgDnNCLG_jrQyX5emwZZDzLbixd&hl=es-419","Atletismo","12:50:00","13:50:00","04/11/2020","30.1km","1.4hours"],
               ["../../assets/img/default-avatar.png","Angelo Ortiz", "https://www.google.com/maps/d/embed?mid=1NtxatBwsDRZ0b_VZmAQGdFWSSE233Y3Q&hl=es-419","Ciclismo","12:50:00","13:50:00","04/11/2020","30.1km","1.4hours"],
               ["../../assets/img/default-avatar.png","Agustín Venegas", "https://www.google.com/maps/d/embed?mid=1yYaYMv79WhM6JXegD89GanNor-IPc-gi&hl=es-419","Atletismo","12:50:00","13:50:00","01/11/2020","30.1km","1.4hours"],
               ["../../assets/img/default-avatar.png","Iván Solís", "https://www.google.com/maps/d/embed?mid=18RcpszqRsKd-Gy4Q6N7PRl5eaPa1bzqL&hl=es-419","Caminata","12:50:00","13:50:00","04/11/2020","30.1km","1.4hours"]]

  public addUrl(actual){
    return this.sanitizer.bypassSecurityTrustResourceUrl(actual);
  }

}
