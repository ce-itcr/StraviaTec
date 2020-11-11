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

  ngOnInit(): void{
    this.addToGroup(this.all);
  }

  all = "master";
  athletesList =   [["Angelo","Angelo Ortiz","angelortizv","Costarricense","123","../../../../assets/img/faces/default-avatar.png","Angelo Ortiz, angelortizv, Costarricense, 01/01/2000"],
                    ["Jonathan","Jonathan Esquivel","jesquivel","Costarricense","123","../../../../assets/img/faces/default-avatar.png","Jonathan Esquivel, jesquivel, Costarricense, 01/01/2000"],
                    ["Iván","Iván Solís","isolis2000","Costarricense","35","../../../../assets/img/faces/default-avatar.png","Iván Solis, isolis2000, Costarricense, 01/01/2000"],
                    ["Agustín","Agustín Venegas","joseagus00","Costarricense","345","../../../../assets/img/faces/default-avatar.png","Agustín Venegas, joseagus00, Costarricense, 01/01/2000"],
                    ["Angelo","Angelo Perez","aperezperez","Costarricense","554","../../../../assets/img/faces/default-avatar.png","Angelo Perez, aperezperez, Costarricense, 01/01/2000"],
                    ["John","John Doe","johndoe","Costarricense","123213","../../../../assets/img/faces/default-avatar.png","John Doe, johndoe, Costarricense, 01/01/2000"]
                  ]

  public addToGroup(athlete){
    var htmlList = document.getElementById("card_id");
    var newList = document.createElement("newList");
    newList.className = "card-group";
    newList.id = "card_id";

    var cont = 0;
    while(cont<this.athletesList.length){
      if(this.athletesList[cont][0] == athlete || this.athletesList[cont][1] == athlete || athlete == this.all){
        var element = document.createElement("");
        element.className = "list-group-item";
        element.appendChild(document.createTextNode(this.athletesList[cont][6]));
        newList.appendChild(element);

      }
      cont++;
    }
    htmlList.replaceWith(newList);
  }

  addFriend(athlete_username){
    this.CS.addFriend(localStorage.getItem("current_username"), athlete_username);
  }



}
