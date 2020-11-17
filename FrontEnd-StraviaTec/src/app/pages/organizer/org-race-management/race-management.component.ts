import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'race-management.component.html'
})

export class RaceManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  ngOnInit(): void{
    this.CS.getOrgRaces(localStorage.getItem('current_username')).subscribe(res => {
      var cont = 1;
      while(cont < res["size"]){
        var race = "race" + cont.toString();
        this.race_management_table_content.push(res[race]["race_id"]);
        this.race_management_table_content.push(res[race]["race_name"]); 
        this.race_management_table_content.push(res[race]["race_date"]); 
        this.race_management_table_content.push(res[race]["race_route"]); 
        this.race_management_table_content.push(res[race]["race_type"]);
        this.race_management_table_content.push(res[race]["race_privacity"]); 
        this.race_management_table_content.push(res[race]["race_cost"]); 
        this.race_management_table_content.push(res[race]["race_accounts"]); 
        this.race_management_table_content.push(res[race]["race_categories"]); 
        this.race_management_table_content.push(res[race]["race_sponsors"]); 
      }
    }, error=>{
      alert(error);
    });
  }

  race_management_table_titles = [
    ["id", "Nombre","Fecha","Recorrido","Tipo de Actividad","Privacidad","Costo","Cuentas Bancarias","Categorías Disponibles","Patrocinadores"]
  ]

  race_management_table_content = [];

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA CREAR CARRERA
  createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    this.CS.createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners, localStorage.getItem("current_username"));
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateRace(race_id ,race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    this.CS.updateRace(race_id, race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners);
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteRace(race_id){
    this.CS.deleteRace(race_id);
  }

}
