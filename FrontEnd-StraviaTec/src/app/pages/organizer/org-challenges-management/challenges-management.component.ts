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

  ngOnInit(): void{
    this.CS.getOrgChallenges(localStorage.getItem("current_username")).subscribe(res => {
      var cont = 1;
      while(cont < res["size"]){
        var challenge = "challenge" + cont.toString();
        this.challenge_management_table_content.push(res[challenge]["challenge_id"]);
        this.challenge_management_table_content.push(res[challenge]["challenge_name"]);
        this.challenge_management_table_content.push(res[challenge]["challenge_period"]);
        this.challenge_management_table_content.push(res[challenge]["challenge_type"]);
        this.challenge_management_table_content.push(res[challenge]["challenge_mode"]);
        this.challenge_management_table_content.push(res[challenge]["challenge_privacity"]);
        this.challenge_management_table_content.push(res[challenge]["challenge_sponsors"]);
      }
    }, error => {
        alert(error);
    });
  }

  challenge_management_table_titles = [
    ["id", "Nombre","Periodo Disponible","Tipo de Actividad","Modo","Privacidad","Patrocinadores"]
  ]

  challenge_management_table_content = []

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVI0 DE DATOS DE RETOS A "COMMUNICATION SERVICE" PARA CREAR RETO
  createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
    this.CS.createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners)
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateChallenge(challenge_id, challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
    this.CS.updateChallenge(challenge_id, challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners);
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteChallenge(challenge_id){
    this.CS.deleteChallenge(challenge_id);
  }

}
