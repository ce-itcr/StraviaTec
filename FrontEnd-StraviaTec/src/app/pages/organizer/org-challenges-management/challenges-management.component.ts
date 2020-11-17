import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'challenges-management.component.html'
})

export class ChallengesManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  race_management_table_titles = [
    ["Nombre","Periodo Disponible","Tipo de Actividad","Modo","Privacidad","Patrocinadores"]
  ]

  race_management_table_content = [
    ["Correr 5 días seguidos", "Noviembre 2020", "Atletismo","Fondo","Público", "StraviaTEC, NorthFace"],
    ["Correr 5 días seguidos", "Noviembre 2020", "Atletismo","Fondo","Público", "StraviaTEC, NorthFace"],
    ["Correr 5 días seguidos", "Noviembre 2020", "Atletismo","Fondo","Público", "StraviaTEC, NorthFace"]

  ]

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVI0 DE DATOS DE RETOS A "COMMUNICATION SERVICE" PARA CREAR RETO
  createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
    this.CS.createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners)
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
    this.CS.updateChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners);
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteChallenge(race_name, race_date){
    this.CS.deleteChallenge(race_name, race_date);
  }

}
