import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'enrollment-management-cmp',
    moduleId: module.id,
    templateUrl: 'enrollment-management.component.html'
})

export class EnrollmentManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  races_table_titles = [
    ["Nombre de la Carrera","Fecha de la Carrera","Recibo de Inscripción","Nombre de Usuario del Deportista"]
  ]
  races_table_content = [
    ["Carrera La Candelaria", "24/12/2020","../../assets/img/default-avatar.png","johndoe"]
  ]

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍ0 DE DATOS DE ACEPTACIÓN DE INSCRIPCIÓN DE CARRERA A "COMMUNICATION SERVICE"
  acceptRaceEnrollment(race_name, athlete_name){
    this.CS.acceptRaceEnrollment(race_name, athlete_name);
  }

  //ENVÍ0 DE DATOS DE DENEGACIÓN DE INSCRIPCIÓN DE CARRERA A "COMMUNICATION SERVICE"
  denyRaceEnrollment(race_name, athlete_name){
    this.CS.denyRaceEnrollment(race_name, athlete_name);
  }
}
