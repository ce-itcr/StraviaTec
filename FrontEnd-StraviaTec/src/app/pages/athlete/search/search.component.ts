import { Component } from '@angular/core';
import { fileURLToPath } from 'url';
import * as $ from "jquery";
import { Button } from 'bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'search-cmp',
    moduleId: module.id,
    templateUrl: 'search.component.html'
})

export class SearchComponent{
  constructor(private CS: CommunicationService) {}

  //SE POPULAN N CARTAS CON LOS USUARIOS QUE NO SE HAN SEGUIDO
  ngOnInit(): void{
    this.athletesList = [];
    this.CS.getUsers(this.all).subscribe(res => {
      var cont = 1;
      while(cont < res["size"]){

        var data = [];
        var user = "user" + cont.toString();

        data.push(res[user]["f_name"] + " " + res[user]["l_name"]);
        data.push(res[user]["username"]);
        data.push(res[user]["nationality"]);
        data.push(res[user]["activities"]);
        data.push(res[user]["prof_img"]);

        this.athletesList.push(data);
        cont++;

      }
    }, error => {
      alert("ERROR");
    });
  }

  all = "";
  athletesList =   [];

  //ENVÍA UN USERNAME AL SERVIDOR Y FILTRA COINCIDENCIAS
  search(data){
    this.all = data;
    this.ngOnInit();
  }

  //AÑADE COMO AMIGO A UN USUARIO SELECCIONADO
  addFriend(athlete_username){
    this.CS.addFriend(athlete_username).subscribe(res => {
      this.all = "";
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }



}
