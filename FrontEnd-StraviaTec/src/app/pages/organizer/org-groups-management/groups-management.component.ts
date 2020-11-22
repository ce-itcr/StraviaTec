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

  ngOnInit(): void {

    //SE POPULA LA TABLA DE GRUPOS, DE EL ORGANIZADOR
    this.CS.getOrgGroups(localStorage.getItem("current_username")).subscribe(res => {
      var cont = 1;
      this.groups_management_table_content = [];
      while(cont < res["size"]){

        var data = [];
        var group = "group" + cont.toString();

        data.push(res[group]["group_id"]);
        data.push(res[group]["group_name"]);
        data.push(res[group]["group_admin"]);
        var cont2 = 1;
        var desc = "";
        while(cont2 < res[group]["athletes"]["size"]){
          var athlete = "athlete" + cont2.toString();
          desc += res[group]["athletes"][athlete]["username"];
          cont2++;
        }

        data.push(desc);

        this.groups_management_table_content.push(data);
        cont++;

      }
    }, error => {
      alert("ERROR");
    });
  }

  groups_management_table_titles = [
    ["id","Nombre del Grupo","Administrador","Deportistas"]
  ]

  groups_management_table_content = [];

    //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
    openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

    //ENVÍ0 DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA CREAR GRUPO
    createGroup(group_name, group_admin){
      this.CS.createGroup(group_name, group_admin).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("ERROR");
      });
    }

    //ENVÍ0 DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA ACTUALIZAR GRUPO
    updateGroup(group_id, group_name, group_admin){
      this.CS.updateGroup(group_id, group_name, group_admin).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("ERROR");
      });
    }

    //ENVÍO DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA ELIMINAR GRUPO
    deleteGroup(group_id){
       this.CS.deleteGroup(group_id).subscribe(res => {
        this.ngOnInit();
       }, error => {
         alert("ERROR");
       });
    }


}
