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

    this.challenge_management_table_content = [];

    this.CS.getOrgChallenges(localStorage.getItem("current_username")).subscribe(res => {
      var cont = 1;
      while(cont < res["size"]){
        var data = [];
        var challenge = "cha" + cont.toString();
        data.push(res[challenge]["cha_id"]);
        data.push(res[challenge]["cha_name"]);
        data.push(res[challenge]["t_period"].slice(0,10));
        data.push(res[challenge]["cha_type"]);
        data.push(res[challenge]["cha_mode"]);
        data.push(res[challenge]["visibility"]);
        data.push(res[challenge]["cha_sponsors"]);
        this.challenge_management_table_content.push(data);
        cont++;
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
    this.CS.createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners).subscribe(res => {
      this.ngOnInit();
    });
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateChallenge(challenge_id, challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
    this.CS.updateChallenge(challenge_id, challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners).subscribe(res => {
      this.ngOnInit();
    });
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteChallenge(challenge_id){
    this.CS.deleteChallenge(challenge_id).subscribe(res => {
      this.ngOnInit();
    });
  }

}
