import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'groups-management.component.html'
})

export class GroupsManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  groups_management_table_titles = [
    ["Nombre del Grupo","Administrador","Deportistas"]
  ]

  groups_management_table_content = [
    ["Ciclistas del TEC", "John Doe Smith","angelortizv, jonex, otro"],
    ["Ciclistas del TEC", "John Doe Smith","angelortizv, jonex, otro"],
    ["Ciclistas del TEC", "John Doe Smith","angelortizv, jonex, otro"]
  ]

    //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
    openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

    //ENVÍ0 DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA CREAR GRUPO
    createGroup(group_name, group_admin){
      this.CS.createGroup(group_name, group_admin);
    }

    //ENVÍ0 DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA ACTUALIZAR GRUPO
    updateGroup(group_name, group_admin){
      this.CS.updateGroup(group_name, group_admin);
    }

    //ENVÍO DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA ELIMINAR GRUPO
    deleteGroup(group_name, group_admin){
       this.CS.deleteGroup(group_name, group_admin);
    }


}
