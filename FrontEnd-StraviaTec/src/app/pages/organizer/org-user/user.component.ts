import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent{
  constructor(private router:Router, private modal:NgbModal, private CS: CommunicationService){}

  //SE LLENA LA TABLA QUE MUESTRA LOS DATOS DEL ORGANIZADOR
  ngOnInit(): void{
    this.CS.getOrgData().subscribe(res => {
      this.userImage = res["organizer"]["prof_img"];
      this.userFullName = res["organizer"]["f_name"] + " " + res["organizer"]["l_name"];
    }, error => {
      alert("ERROR");
    })
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}


  userImage = "";
  userFullName = "Usuario por Defecto";
  username = localStorage.getItem("current_username");

}
