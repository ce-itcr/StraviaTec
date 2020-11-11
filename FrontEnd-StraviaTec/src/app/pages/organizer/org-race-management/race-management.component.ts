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

  race_management_table_titles = [
    ["Nombre","Fecha","Recorrido","Tipo de Actividad","Privacidad","Costo","Cuentas Bancarias","Categorías Disponibles","Patrocinadores"]
  ]

  race_management_table_content = [
    ["Carrera La Candelaria", "24/12/2020", "C:\Users\AdminCR\Documents\StraviaTec\FrontEnd-StraviaTec\src\assets\gpx\Lunch_Ride.gpx","Atletismo","Público","5000 Colones exactos", "300000000000, 400000000000","Elite, Master A","StraviaTEC, NorthFace"],
    ["Carrera La Candelaria", "24/12/2020", "C:\Users\AdminCR\Documents\StraviaTec\FrontEnd-StraviaTec\src\assets\gpx\Lunch_Ride.gpx","Atletismo","Público","5000 Colones exactos", "300000000000, 400000000000","Elite, Master A","StraviaTEC, NorthFace"],
    ["Carrera La Candelaria", "24/12/2020", "C:\Users\AdminCR\Documents\StraviaTec\FrontEnd-StraviaTec\src\assets\gpx\Lunch_Ride.gpx","Atletismo","Público","5000 Colones exactos", "300000000000, 400000000000","Elite, Master A","StraviaTEC, NorthFace"]
  ]

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA CREAR CARRERA
  createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    this.CS.createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners);
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    this.CS.updateRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners);
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteRace(race_name, race_date){
    this.CS.deleteRace(race_name, race_date);
  }

}
