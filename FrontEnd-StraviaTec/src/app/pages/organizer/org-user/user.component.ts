import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent{
  constructor(private router:Router, private modal:NgbModal){}

  ngOnInit(): void{
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}


  userImage = "../../assets/img/default-avatar.png";
  userFullName = "Usuario por Defecto";
  username = localStorage.getItem("current_username");

}
